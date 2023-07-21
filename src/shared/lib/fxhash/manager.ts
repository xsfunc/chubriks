import { createEffect, createEvent, createStore, sample } from 'effector'
import { combineEvents } from 'patronum'

const setParamsFx = createEffect(({ params }: SetParamsOptions) => $fx.params(params))
const setFeaturesFx = createEffect(({ features }: SetFeaturesOptions) => $fx.features(features))
const updateParamsFx = createEffect((data: FxEmitData) => $fx.emit('params:update', data))
const getParamsFx = createEffect(() => $fx.getParams())
const subscribeOnUpdateFx = createEffect(() => $fx.on(
  'params:update',
  () => {},
  () => {
    console.warn('Listener: Params updated')
    getParamsFx()
  },
))

const initCalled = createEvent<FxInitOptions>()
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
  updateParams: updateParamsCalled,
  setFeatures: setFeaturesCalled,
  inited: combineEvents({
    events: [
      subscribeOnUpdateFx.done,
      setParamsFx.done,
      getParamsFx.done,
    ],
  }),
}

sample({
  clock: fxhash.init,
  target: [
    subscribeOnUpdateFx,
    setParamsFx,
    setFeaturesFx,
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
