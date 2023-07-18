import { createEffect, createEvent, createStore, sample } from 'effector'

const setParamsFx = createEffect(({ params }: SetParamsOptions) => $fx.params(params))
const setFeaturesFx = createEffect(({ features }: SetFeaturesOptions) => $fx.features(features))
const updateParamsFx = createEffect((data: FxEmitData) => $fx.emit('params:update', data))
const getParamsFx = createEffect(() => $fx.getParams())

const initCalled = createEvent<FxInitOptions>()
const setFeaturesCalled = createEvent<FxFeatures>()
const updateParamsCalled = createEvent<FxEmitData>()
const paramsUpdated = updateParamsFx.done
const inited = setParamsFx.done
// individual events for this project
const updateConfigParamCalled = updateParamsCalled.prepend(data => ({ config: JSON.stringify(data) }))

const $fxhash = createStore($fx)
const $context = $fxhash.map(fx => fx.context)
const $minter = $fxhash.map(fx => fx.minter)
const $hash = $fxhash.map(fx => fx.hash)

// individual stores for this project
const $params = createStore<MyParamsValues>({})
const $configParam = $params.map(({ config }: MyParamsValues) => config ? JSON.parse(config) : null)

sample({
  clock: initCalled,
  target: [
    setParamsFx,
    // setFeaturesFx,
  ],
})
sample({
  clock: [setParamsFx.done, paramsUpdated],
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

export const fxhash = {
  init: initCalled,
  updateParams: updateParamsCalled,
  setFeatures: setFeaturesCalled,
  hash: $hash,
  minter: $minter,
  context: $context,
  params: $params,
  inited,

  updateConfigParam: updateConfigParamCalled,
  configParam: $configParam,
}

interface FxInitOptions {
  params: FxParamBaseDefinition[]
  features: FxFeatures
}
type SetFeaturesOptions = Pick<FxInitOptions, 'features'>
type SetParamsOptions = Pick<FxInitOptions, 'params'>

// individual types for this project
interface MyParamsValues { config?: string }
