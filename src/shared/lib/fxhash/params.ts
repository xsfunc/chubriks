import { reshape } from 'patronum'
import { decode, encode } from 'msgpack-lite'
import type { CompositionProps } from '../draw/types'
import { drawApi } from '../draw'
import { fxhash } from './manager'

const parsed = reshape({
  source: fxhash.params,
  shape: {
    config: params => decode(params.config) as CompositionProps,
    effects: params => (params?.effects ? decode(params.effects) : []) as object[],
    patterns: params => drawApi.decodePatterns(params),
  },
})

const updateConfigParamCalled = fxhash.updateParams
  .prepend(data => ({ config: new Uint8Array(encode(data)) }))
const updateEffectsParamCalled = fxhash.updateParams
  .prepend(data => ({ effects: new Uint8Array(encode(data)) }))
const updatePatternsParamCalled = fxhash.updateParams
  .prepend(drawApi.encodePatterns)

export const params = {
  updateConfig: updateConfigParamCalled,
  updateEffects: updateEffectsParamCalled,
  updatePatterns: updatePatternsParamCalled,
  ...parsed,
}
