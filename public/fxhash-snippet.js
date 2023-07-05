const search = new URLSearchParams(window.location.search)
const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
const b58dec = str => [...str].reduce((p, c) => p * alphabet.length + alphabet.indexOf(c) | 0, 0)

function sfc32(a, b, c, d) {
  return () => {
    a |= 0
    b |= 0
    c |= 0
    d |= 0
    const t = (a + b | 0) + d | 0
    d = d + 1 | 0
    a = b ^ b >>> 9
    b = c + (c << 3) | 0
    c = c << 21 | c >>> 11
    c = c + t | 0
    return (t >>> 0) / 4294967296
  }
}
const rndHash = n => Array(n).fill(0).map(_ => alphabet[(Math.random() * alphabet.length) | 0]).join('')
const matcher = (str, start) => str.slice(start).match(new RegExp(`.{${(str.length - start) >> 2}}`, 'g')).map(b58dec)
// make fxrand from hash
const fxhash = search.get('fxhash') || `oo${rndHash(49)}`
let fxrand = sfc32(...matcher(fxhash, 2))
// make fxrandminter from minter address
const fxminter = search.get('fxminter') || `tz1${rndHash(33)}`
let fxrandminter = sfc32(...matcher(fxminter, 3))
// true if preview mode active, false otherwise
// you can append preview=1 to the URL to simulate preview active
const isFxpreview = search.get('preview') === '1'
// call this method to trigger the preview
function fxpreview() {
  console.log('FXPREVIEW')
  // window.dispatchEvent(new Event("fxhash-preview"))
  // setTimeout(() => fxpreview(), 500)
}
// get the byte params from the URL
const searchParams = search.get('fxparams')
const initialInputBytes = searchParams?.replace('0x', '')
function throttle(func, delay) {
  let isThrottled = false

  return function (...args) {
    if (!isThrottled) {
      func.apply(this, args)
      isThrottled = true

      setTimeout(() => {
        isThrottled = false
      }, delay)
    }
  }
}

function stringToHex(s) {
  let rtn = ''
  for (let i = 0; i < s.length; i++)
    rtn += s.charCodeAt(i).toString(16).padStart(4, '0')

  return rtn
}

function completeHexColor(hexCode) {
  let hex = hexCode.replace('#', '')
  if (hex.length === 6)
    hex = `${hex}ff`

  if (hex.length === 3)
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}ff`

  return hex
}

// the parameter processor, used to parse fxparams
const processors = {
  number: {
    serialize: (input) => {
      const view = new DataView(new ArrayBuffer(8))
      view.setFloat64(0, input)
      return view.getBigUint64(0).toString(16).padStart(16, '0')
    },
    deserialize: (input) => {
      const view = new DataView(new ArrayBuffer(8))
      for (let i = 0; i < 8; i++)
        view.setUint8(i, Number.parseInt(input.substring(i * 2, i * 2 + 2), 16))

      return view.getFloat64(0)
    },
    bytesLength: () => 8,
    constrain: (value, definition) => {
      let min = Number.MIN_SAFE_INTEGER
      if (typeof definition.options?.min !== 'undefined')
        min = Number(definition.options.min)
      let max = Number.MAX_SAFE_INTEGER
      if (typeof definition.options?.max !== 'undefined')
        max = Number(definition.options.max)
      max = Math.min(max, Number.MAX_SAFE_INTEGER)
      min = Math.max(min, Number.MIN_SAFE_INTEGER)
      const v = Math.min(Math.max(value, min), max)
      if (definition?.options?.step) {
        const t = 1.0 / definition?.options?.step
        return Math.round(v * t) / t
      }
      return v
    },
    random: (definition) => {
      let min = Number.MIN_SAFE_INTEGER
      if (typeof definition.options?.min !== 'undefined')
        min = Number(definition.options.min)
      let max = Number.MAX_SAFE_INTEGER
      if (typeof definition.options?.max !== 'undefined')
        max = Number(definition.options.max)
      max = Math.min(max, Number.MAX_SAFE_INTEGER)
      min = Math.max(min, Number.MIN_SAFE_INTEGER)
      const v = Math.random() * (max - min) + min
      if (definition?.options?.step) {
        const t = 1.0 / definition?.options?.step
        return Math.round(v * t) / t
      }
      return v
    },
  },
  bigint: {
    serialize: (input) => {
      const view = new DataView(new ArrayBuffer(8))
      view.setBigInt64(0, BigInt(input))
      return view.getBigUint64(0).toString(16).padStart(16, '0')
    },
    deserialize: (input) => {
      const view = new DataView(new ArrayBuffer(8))
      for (let i = 0; i < 8; i++)
        view.setUint8(i, Number.parseInt(input.substring(i * 2, i * 2 + 2), 16))

      return view.getBigInt64(0)
    },
    bytesLength: () => 8,
    random: (definition) => {
      const MIN_SAFE_INT64 = -9223372036854775808n
      const MAX_SAFE_INT64 = 9223372036854775807n
      let min = MIN_SAFE_INT64
      let max = MAX_SAFE_INT64
      if (typeof definition.options?.min !== 'undefined')
        min = BigInt(definition.options.min)
      if (typeof definition.options?.max !== 'undefined')
        max = BigInt(definition.options.max)
      const range = max - min
      const bits = range.toString(2).length
      let random
      do {
        random = BigInt(
          `0b${Array.from(
            crypto.getRandomValues(new Uint8Array(Math.ceil(bits / 8))),
          )
            .map(b => b.toString(2).padStart(8, '0'))
            .join('')}`,
        )
      } while (random > range)
      return random + min
    },
  },
  boolean: {
    serialize: input =>
      (typeof input === 'boolean' && input)
        || (typeof input === 'string' && input === 'true')
        ? '01'
        : '00',
    // if value is "00" -> 0 -> false, otherwise we consider it's 1
    deserialize: (input) => {
      return input !== '00'
    },
    bytesLength: () => 1,
    random: () => Math.random() < 0.5,
  },
  color: {
    serialize: (input) => {
      return completeHexColor(input)
    },
    deserialize: input => input,
    bytesLength: () => 4,
    transform: (input) => {
      const r = Number.parseInt(input.slice(0, 2), 16)
      const g = Number.parseInt(input.slice(2, 4), 16)
      const b = Number.parseInt(input.slice(4, 6), 16)
      const a = Number.parseInt(input.slice(6, 8), 16)
      return {
        hex: {
          rgb: `#${input.slice(0, 6)}`,
          rgba: `#${input}`,
        },
        obj: {
          rgb: { r, g, b },
          rgba: { r, g, b, a },
        },
        arr: {
          rgb: [r, g, b],
          rgba: [r, g, b, a],
        },
      }
    },
    constrain: (value, definition) => {
      const hex = value.replace('#', '')
      return hex.slice(0, 8).padEnd(8, 'f')
    },
    random: () =>
      `${[...Array(8)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')}`,
  },
  string: {
    serialize: (input, def) => {
      let max = 64
      if (typeof def.options?.maxLength !== 'undefined')
        max = Number(def.options.maxLength)
      let hex = stringToHex(input.substring(0, max))
      hex = hex.padEnd(max * 4, '0')
      return hex
    },
    deserialize: (input) => {
      const hx = input.match(/.{1,4}/g) || []
      let rtn = ''
      for (let i = 0; i < hx.length; i++) {
        const int = Number.parseInt(hx[i], 16)
        if (int === 0)
          break
        rtn += String.fromCharCode(int)
      }
      return rtn
    },
    bytesLength: (options) => {
      if (typeof options?.maxLength !== 'undefined')
        return Number(options.maxLength) * 2
      return 64 * 2
    },
    constrain: (value, definition) => {
      let min = 0
      if (typeof definition.options?.minLength !== 'undefined')
        min = definition.options.minLength
      let max = 64
      if (typeof definition.options?.maxLength !== 'undefined')
        max = definition.options.maxLength
      const v = value.slice(0, max)
      if (v.length < min)
        return v.padEnd(min)

      return v
    },
    random: (definition) => {
      let min = 0
      if (typeof definition.options?.minLength !== 'undefined')
        min = definition.options.minLength
      let max = 64
      if (typeof definition.options?.maxLength !== 'undefined')
        max = definition.options.maxLength
      const length = Math.round(Math.random() * (max - min) + min)
      return [...Array(length)]
        .map(i => (~~(Math.random() * 36)).toString(36))
        .join('')
    },
  },
  select: {
    serialize: (input, def) => {
      // find the index of the input in the array of options
      return Math.min(255, def.options?.options?.indexOf(input) || 0)
        .toString(16)
        .padStart(2, '0')
    },
    deserialize: (input, definition) => {
      return (
        definition.options.options[Number.parseInt(input, 16)]
        || definition.default
      )
    },
    bytesLength: () => 1,
    constrain: (value, definition) => {
      if (definition.options.options.includes(value))
        return value

      return definition.options.options[0]
    },
    random: (definition) => {
      const index = Math.round(
        Math.random() * (definition?.options?.options?.length - 1) + 0,
      )
      return definition?.options?.options[index]
    },
  },
}

// Utility function to get parameter value, default value, or a random value
function getParamValue(param, def, processor) {
  if (typeof param !== 'undefined')
    return param
  if (typeof def.default !== 'undefined')
    return def.default
  return processor.random(def)
}

// params are injected into the piece using the binary representation of the
// numbers, to keep precision
function serializeParams(params, definition) {
  // Initialization of the hex string for parameters
  let hexString = ''
  // If definition is not provided, return an empty hex string
  if (!definition)
    return hexString
  // Iterating over the definitions
  for (const def of definition) {
    const { id, type } = def
    // Get the processor for the given type
    const processor = processors[type]
    // Get the param value, fall back to default or a random value
    const paramValue = getParamValue(params[id], def, processor)
    // Serialize the param value
    const serializedParam = processor.serialize(paramValue, def)
    // Concatenate serialized params
    hexString += serializedParam
  }
  return hexString
}

// takes the parameters as bytes and outputs an object with the
// deserialized parameters, identified by their id in an object
function deserializeParams(bytes, definition) {
  const params = {}
  for (const def of definition) {
    const processor = processors[def.type]
    // if we don't have any parameters defined in the URL, set the
    // default value and move on
    if (!bytes) {
      let v
      if (typeof def.default === 'undefined')
        v = processor.random(def)
      else v = def.default
      params[def.id] = processor.constrain?.(v, def) || v
      continue
    }
    // extract the length from the bytes & shift the initial bytes string
    const valueBytes = bytes.substring(
      0,
      processor.bytesLength(def?.options) * 2,
    )
    bytes = bytes.substring(processor.bytesLength(def?.options) * 2)
    // deserialize the bytes into the params
    const value = processor.deserialize(valueBytes, def)
    params[def.id] = processor.constrain?.(value, def) || value
  }
  return params
}

function processParam(paramId, value, definitions, transformer) {
  const definition = definitions.find(d => d.id === paramId)
  const processor = processors[definition.type]
  return processor[transformer]?.(value, definition) || value
}

function processParams(values, definitions, transformer) {
  const paramValues = {}
  for (const definition of definitions) {
    const processor = processors[definition.type]
    const value = values[definition.id]
    // deserialize the bytes into the params
    paramValues[definition.id]
      = processor[transformer]?.(value, definition) || value
  }
  return paramValues
}

window.$fx = {
  _version: '3.2.0',
  _processors: processors,
  // where params def & features will be stored
  _params: undefined,
  _features: undefined,
  // where the parameter values are stored
  _paramValues: {},
  _listeners: {},
  async _receiveUpdateParams(newRawValues, onDefault) {
    const handlers = await this.propagateEvent(
      'params:update',
      newRawValues,
    )
    handlers.forEach(([optInDefault, onDone]) => {
      if (!(typeof optInDefault == 'boolean' && !optInDefault)) {
        this._updateParams(newRawValues)
        onDefault?.()
      }
      onDone?.(optInDefault, newRawValues)
    })
    if (handlers.length === 0) {
      this._updateParams(newRawValues)
      onDefault?.()
    }
  },
  _updateParams(newRawValues) {
    const constrained = processParams(
      { ...this._rawValues, ...newRawValues },
      this._params,
      'constrain',
    )
    Object.keys(constrained).forEach((paramId) => {
      this._rawValues[paramId] = constrained[paramId]
    })
    this._paramValues = processParams(
      this._rawValues,
      this._params,
      'transform',
    )
    this._updateInputBytes()
  },
  _updateInputBytes() {
    const bytes = serializeParams(this._rawValues, this._params)
    this.inputBytes = bytes
  },
  _emitParams(newRawValues) {
    const constrainedValues = Object.keys(newRawValues).reduce(
      (acc, paramId) => {
        acc[paramId] = processParam(
          paramId,
          newRawValues[paramId],
          this._params,
          'constrain',
        )
        return acc
      },
      {},
    )
    this._receiveUpdateParams(constrainedValues, () => {
      parent.postMessage(
        {
          id: 'fxhash_emit:params:update',
          data: {
            params: constrainedValues,
          },
        },
        '*',
      )
    })
  },
  hash: fxhash,
  rand: fxrand,
  minter: fxminter,
  randminter: fxrandminter,
  iteration: Number(search.get('fxiteration')) || 1,
  context: search.get('fxcontext') || 'standalone',

  preview: fxpreview,
  isPreview: isFxpreview,
  params(definition) {
    this._params = definition
    this._rawValues = deserializeParams(initialInputBytes, definition)
    this._paramValues = processParams(
      this._rawValues,
      definition,
      'transform',
    )
    this._updateInputBytes()
  },
  features(features) {
    this._features = features
  },
  getFeature(id) {
    return this._features[id]
  },
  getFeatures() {
    return this._features
  },
  getParam(id) {
    return this._paramValues[id]
  },
  getParams() {
    return this._paramValues
  },
  getRawParam(id) {
    return this._rawValues[id]
  },
  getRawParams() {
    return this._rawValues
  },
  getRandomParam(id) {
    const definition = this._params.find(d => d.id === id)
    const processor = processors[definition.type]
    return processor.random(definition)
  },
  getDefinitions() {
    return this._params
  },
  stringifyParams(params) {
    return JSON.stringify(
      params || this._rawValues,
      (key, value) => {
        if (typeof value === 'bigint')
          return value.toString()
        return value
      },
      2,
    )
  },
  on(name, callback, onDone) {
    if (!this._listeners[name])
      this._listeners[name] = []

    this._listeners[name].push([callback, onDone])
    return () => {
      const index = this._listeners[name].findIndex(
        ([c]) => c === callback,
      )
      if (index > -1)
        this._listeners[name].splice(index, 1)
    }
  },
  async propagateEvent(name, data) {
    const results = []
    if (this._listeners?.[name]) {
      for (const [callback, onDone] of this._listeners[name]) {
        const result = callback(data)
        results.push([
          result instanceof Promise ? (await result) : result,
          onDone,
        ])
      }
    }
    return results
  },
  emit(id, data) {
    switch (id) {
      case 'params:update':
        this._emitParams(data)
        break
      default:
        console.log('$fx.emit called with unknown id:', id)
        break
    }
  },
}
function resetFxRand() {
  fxrand = sfc32(...matcher(fxhash, 2))
  $fx.rand = fxrand
  fxrand.reset = resetFxRand
}
fxrand.reset = resetFxRand
function resetFxRandMinter() {
  fxrandminter = sfc32(...matcher(fxminter, 3))
  $fx.randminter = fxrandminter
  fxrandminter.reset = resetFxRandMinter
}
fxrandminter.reset = resetFxRandMinter

window.addEventListener('message', (event) => {
  if (event.data === 'fxhash_getInfo') {
    parent.postMessage({
      id: 'fxhash_getInfo',
      data: {
        version: window.$fx._version,
        hash: window.$fx.hash,
        iteration: window.$fx.iteration,
        features: window.$fx.getFeatures(),
        params: {
          definitions: window.$fx.getDefinitions(),
          values: window.$fx.getRawParams(),
        },
        minter: window.$fx.minter,
      },
    }, '*')
  }
  if (event.data?.id === 'fxhash_params:update') {
    const { params } = event.data.data
    if (params)
      window.$fx._receiveUpdateParams(params)
  }
})
