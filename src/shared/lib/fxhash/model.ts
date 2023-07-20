import { createEffect, createEvent, createStore, sample } from 'effector'
import { combineEvents, debug } from 'patronum'

const initCalled = createEvent<FxInitOptions>()
const setFeaturesCalled = createEvent<FxFeatures>()
const updateParamsCalled = createEvent<FxEmitData>()
const updateConfigParamCalled = updateParamsCalled.prepend(data => ({ config: JSON.stringify(data) }))

const setParamsFx = createEffect(({ params }: SetParamsOptions) => $fx.params(params))
const setFeaturesFx = createEffect(({ features }: SetFeaturesOptions) => $fx.features(features))
const updateParamsFx = createEffect((data: FxEmitData) => $fx.emit('params:update', data))
const getParamsFx = createEffect(() => $fx.getParams())
const parseParamFx = createEffect((param: string) => JSON.parse(param))
const subscribeOnUpdateFx = createEffect(() => $fx.on(
  'params:update',
  () => {},
  () => {
    console.warn('Listener: Params updated')
    getParamsFx()
  },
))

const inited = combineEvents({
  events: [
    subscribeOnUpdateFx.done,
    setParamsFx.done,
    getParamsFx.done,
  ],
})
const $random = createStore({
  random: $fx.rand,
  resetRandom: $fx.rand.reset,
  randomMinter: $fx.randminter,
  resetRandomMinter: $fx.randminter.reset,
})
const $fxhash = createStore($fx)
const $context = $fxhash.map(fx => fx.context)
const $minter = $fxhash.map(fx => fx.minter)
const $hash = $fxhash.map(fx => fx.hash)

// individual stores for this project
const $params = createStore<MyParamsValues>({})
const $configParam = createStore({})
// const $configParam = $params.map(({ config }: MyParamsValues) => {
//   if (!config)
//     return {}
//   console.warn(JSON.parse(config))
//   return JSON.parse(config)
// })

sample({
  clock: $params,
  filter: params => Boolean(params.config),
  fn: ({ config }) => config,
  target: parseParamFx,
})
sample({
  clock: parseParamFx.doneData,
  target: $configParam,
})

debug({ fx: updateParamsFx })

export const fxhash = {
  init: initCalled,
  updateParams: updateParamsCalled,
  setFeatures: setFeaturesCalled,
  hash: $hash,
  minter: $minter,
  context: $context,
  random: $random,
  params: $params,
  updateConfigParam: updateConfigParamCalled,
  configParam: $configParam,
  inited,
}

sample({
  clock: initCalled,
  target: [
    subscribeOnUpdateFx,
    setParamsFx,
    // setFeaturesFx,
  ],
})
sample({
  clock: setParamsFx.done,
  target: getParamsFx,
})
sample({
  clock: getParamsFx.doneData,
  target: $params,
})
sample({
  clock: setFeaturesCalled,
  fn: features => ({ features }),
  target: setFeaturesFx,
})
sample({
  clock: updateParamsCalled,
  target: updateParamsFx,
})

interface FxInitOptions {
  params: FxParamDefinition[]
  features: FxFeatures
}
type SetFeaturesOptions = Pick<FxInitOptions, 'features'>
type SetParamsOptions = Pick<FxInitOptions, 'params'>

// individual types for this project
interface MyParamsValues { config?: string }
