import { createEffect, createEvent, createStore, sample } from 'effector'
import { debug } from 'patronum'
import { drawManager } from '../draw'

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
const $params = createStore<FxParamsValues>({})

// individual stores for this project
const $configParam = $params.map(({ config }) => config ? JSON.parse(config) : null)

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

sample({
  clock: $params,
  target: drawManager.draw,
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

debug({ updateParamFail: updateParamsFx.fail })

interface FxInitOptions {
  params: FxParamBaseDefinition[]
  features: FxFeatures
}
type SetFeaturesOptions = Omit<FxInitOptions, 'params'>
type SetParamsOptions = Omit<FxInitOptions, 'features'>
