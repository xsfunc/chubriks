import { createEffect, createEvent, createStore, sample } from 'effector'
import { combineEvents } from 'patronum'

const setParamsDefinitionsFx = createEffect(({ params }: SetParamsOptions) => $fx.params(params))
const setFeaturesFx = createEffect(({ features }: SetFeaturesOptions) => $fx.features(features))
const updateParamsFx = createEffect((data: FxEmitData) => $fx.emit('params:update', data))
const getParamsFx = createEffect(() => $fx.getParams())
const previewFx = createEffect(() => $fx.preview())
const subscribeOnUpdateFx = createEffect(() => $fx.on(
  'params:update',
  () => {},
  () => {
    console.warn('Listener: Params updated')
    getParamsFx()
  },
))

const initCalled = createEvent<FxInitOptions>()
const captureCalled = createEvent<void>()
const setFeaturesCalled = createEvent<FxFeatures>()
const updateParamsCalled = createEvent<FxEmitData>()

const $fxhash = createStore($fx)
const $params = createStore<FxParamsValues>({})
const $random = createStore({
  random: $fx.rand,
  resetRandom: $fx.rand.reset,
  randomMinter: $fx.randminter,
  resetRandomMinter: $fx.randminter.reset,
})

export const fxhash = {
  hash: $fxhash.map(fx => fx.hash),
  minter: $fxhash.map(fx => fx.minter),
  context: $fxhash.map(fx => fx.context),
  random: $random,
  params: $params,

  init: initCalled,
  capture: captureCalled,
  updateParams: updateParamsCalled,
  setFeatures: setFeaturesCalled,
  inited: combineEvents({
    events: [
      subscribeOnUpdateFx.done,
      setParamsDefinitionsFx.done,
      getParamsFx.done,
    ],
  }),
}

sample({
  clock: fxhash.init,
  target: [
    subscribeOnUpdateFx,
    setParamsDefinitionsFx,
    setFeaturesFx,
  ],
})
sample({
  clock: setParamsDefinitionsFx.done,
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
  clock: captureCalled,
  target: previewFx,
})
