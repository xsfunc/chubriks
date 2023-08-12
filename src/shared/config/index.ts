import { configParamLength, configParamUint8Encoded, defaultConfigParam, uint8EncodedArray } from './initial-params'
import { paletteConfig } from './palette'
import { theme } from './theme'

export const configApi = {
  theme,
  uint8EncodedArray,
  configParamUint8Encoded,
  defaultConfigParam,
  configParamLength,
  palette: paletteConfig,
}
