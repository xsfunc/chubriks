import { fxhash } from './manager'

const $config = fxhash.params.map(params => JSON.parse(params?.config || '{}'))
const $effects = fxhash.params.map(params => JSON.parse(params?.effects || '[]'))

const updateConfigParamCalled = fxhash.updateParams
  .prepend(data => ({ config: JSON.stringify(data) }))
const updateEffectsParamCalled = fxhash.updateParams
  .prepend(data => ({ effects: JSON.stringify(data) }))

export const params = {
  config: $config,
  effects: $effects,
  updateConfig: updateConfigParamCalled,
  updateEffects: updateEffectsParamCalled,
}
