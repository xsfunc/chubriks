import { fillingApi } from '../filling'
import type { BasePatternOptions, BasePatternSerialized, FourColorPatternOptions, FourColorPatternSerialized, ThreeColorPatternOptions, ThreeColorPatternSerialized } from './types'

export const PATTERN = {
  WAVES: 0,
  CROSS: 1,
  HERRINGBONE: 2,
  LINE: 3,
  FLOWER: 4,
  PLUS: 5,
  CIRCLES: 6,
  NEW: 7,
  PLAID: 8,
  SQUARES: 9,
} as const

export const serializer = {
  base: (options: BasePatternOptions): BasePatternSerialized => [
    options.patternType,
    options.id,
    options.rotate,
    options.scale,
    options.strokeWidth,
    fillingApi.serialize(options.color1),
    fillingApi.serialize(options.color2),
  ],
  threeColor: (options: ThreeColorPatternOptions): ThreeColorPatternSerialized => [
    options.patternType,
    options.id,
    options.rotate,
    options.scale,
    options.strokeWidth,
    fillingApi.serialize(options.color1),
    fillingApi.serialize(options.color2),
    fillingApi.serialize(options.color3),
  ],
  fourColor: (options: FourColorPatternOptions): FourColorPatternSerialized => [
    options.patternType,
    options.id,
    options.rotate,
    options.scale,
    options.strokeWidth,
    fillingApi.serialize(options.color1),
    fillingApi.serialize(options.color2),
    fillingApi.serialize(options.color3),
    fillingApi.serialize(options.color4),
  ],
}

export const deserializer = {
  base: (data: BasePatternSerialized): BasePatternOptions => ({
    patternType: data[0],
    id: data[1],
    rotate: data[2],
    scale: data[3],
    strokeWidth: data[4],
    color1: fillingApi.deserialize(data[5]),
    color2: fillingApi.deserialize(data[6]),
  }),
  threeColor: (data: ThreeColorPatternSerialized): ThreeColorPatternOptions => ({
    patternType: data[0],
    id: data[1],
    rotate: data[2],
    scale: data[3],
    strokeWidth: data[4],
    color1: fillingApi.deserialize(data[5]),
    color2: fillingApi.deserialize(data[6]),
    color3: fillingApi.deserialize(data[7]),
  }),
  fourColor: (data: FourColorPatternSerialized): FourColorPatternOptions => ({
    patternType: data[0],
    id: data[1],
    rotate: data[2],
    scale: data[3],
    strokeWidth: data[4],
    color1: fillingApi.deserialize(data[5]),
    color2: fillingApi.deserialize(data[6]),
    color3: fillingApi.deserialize(data[7]),
    color4: fillingApi.deserialize(data[8]),
  }),
}
