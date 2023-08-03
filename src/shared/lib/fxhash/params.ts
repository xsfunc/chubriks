import { reshape } from 'patronum'
import { decode, encode } from 'msgpack-lite'
import { createEvent, sample } from 'effector'
import { drawApi } from '../draw'
import type { PatternOptions } from '../draw/types'
import { fxhash } from './manager'

const updateParamsCalled = createEvent()
const encodeAndUpdateFxParams = createEvent()
const $decodedConfig = fxhash.params.map(rawParams => decode(rawParams.config))
const parsed = reshape({
  source: $decodedConfig,
  shape: {
    config: params => params,
    effects: params => params.effects,
    patterns: params => drawApi.patterns.deserializePatterns(params.patterns),
    gradients: params => params.gradients,
  },
})

const updateConfigParamCalled = updateParamsCalled

const updateEffectsParamCalled = updateParamsCalled
  .prepend(effects => ({ effects }))
const updatePatternsParamCalled = updateParamsCalled
  .prepend<PatternOptions[]>(patterns => ({ patterns: drawApi.patterns.serializePatterns(patterns) }))
const updateGradientsParamCalled = updateParamsCalled
  .prepend(gradients => ({ gradients }))

sample({
  clock: updateParamsCalled,
  source: $decodedConfig,
  fn: (config, payload) => ({ ...config, ...payload }),
  target: encodeAndUpdateFxParams,
})
sample({
  clock: encodeAndUpdateFxParams,
  fn: configParam => ({ config: new Uint8Array(encode(configParam)) }),
  target: fxhash.updateParams,
})

export const params = {
  updateConfig: updateConfigParamCalled,
  updateEffects: updateEffectsParamCalled,
  updatePatterns: updatePatternsParamCalled,
  updateGradients: updateGradientsParamCalled,
  ...parsed,
}
