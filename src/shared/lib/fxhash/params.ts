import { reshape } from 'patronum'
import { decode, encode } from 'msgpack-lite'
import type { CompositionProps, PatternOptions, PatternSerialized } from '../draw/types'
import { drawApi } from '../draw'
import { fxhash } from './manager'

const parsed = reshape({
  source: fxhash.params,
  shape: {
    config: params => decode(params.config) as CompositionProps,
    effects: params => (params?.effects ? decode(params.effects) : []) as object[],
    patterns: params => decodePatterns(params),
  },
})

const updateConfigParamCalled = fxhash.updateParams
  .prepend(data => ({ config: new Uint8Array(encode(data)) }))
const updateEffectsParamCalled = fxhash.updateParams
  .prepend(data => ({ effects: new Uint8Array(encode(data)) }))
const updatePatternsParamCalled = fxhash.updateParams
  .prepend(encodePatterns)

export const params = {
  updateConfig: updateConfigParamCalled,
  updateEffects: updateEffectsParamCalled,
  updatePatterns: updatePatternsParamCalled,
  ...parsed,
}

function encodePatterns(patternOptionsList: PatternOptions[]) {
  const { patternMap, patterns } = drawApi
  const serializeFnMap = {
    [patternMap.WAVES]: patterns.waves.serialize,
    [patternMap.CROSS]: patterns.cross.serialize,
    [patternMap.HERRINGBONE]: patterns.herringbone.serialize,
  } as const

  const serializedList = patternOptionsList.map((options) => {
    const serializeFn = serializeFnMap[options.patternType]
    return serializeFn(options)
  })

  const encoded = encode(serializedList)
  const patternsBytes = new Uint8Array(encoded)
  return { patterns: patternsBytes }
}

function decodePatterns(params: { patterns: Uint8Array }) {
  if (params.patterns === undefined)
    return []

  const decodedList = decode(params.patterns) as PatternSerialized[]
  const { patternMap, patterns } = drawApi
  const patternsFnMap = {
    [patternMap.WAVES]: patterns.waves.deserialize,
    [patternMap.CROSS]: patterns.cross.deserialize,
    [patternMap.HERRINGBONE]: patterns.herringbone.deserialize,
  } as const

  return decodedList.map((pattern) => {
    const [patternType] = pattern
    const deserialize = patternsFnMap[patternType]
    return deserialize(pattern)
  })
}
