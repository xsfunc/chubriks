import { reshape } from 'patronum'
import { fxhash } from './manager'

const parsedParams = reshape({
  source: fxhash.params,
  shape: {
    config: params => JSON.parse(params?.config || '{}') as object,
    effects: params => JSON.parse(params?.effects || '[]') as object[],
    patterns: params => JSON.parse(params?.patterns || '[]') as object[],
  },
})

const updateConfigParamCalled = fxhash.updateParams
  .prepend(data => ({ config: JSON.stringify(data) }))
const updateEffectsParamCalled = fxhash.updateParams
  .prepend(data => ({ effects: JSON.stringify(data) }))
const updatePatternsParamCalled = fxhash.updateParams
  .prepend(data => ({ patterns: JSON.stringify(data) }))

export const params = {
  updateConfig: updateConfigParamCalled,
  updateEffects: updateEffectsParamCalled,
  updatePattern: updatePatternsParamCalled,
  ...parsedParams,
}
