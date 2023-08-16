import { encode } from 'msgpack-lite'
import { fillingApi } from '../lib/draw/filling'
import type { CompositionProps } from '../lib'

export type ConfigParamSerialized = ReturnType<typeof serialize>
export type ConfigParam = Omit<CompositionProps, 'colors'>

export const defaultConfigParam: ConfigParam = {
  palette: {
    seed: 0,
    hueShift: 0,
  },
  face: {
    eyes: {
      size: 5,
      variant: 1,
      y: 0,
      mirror: false,
    },
    mouth: {
      size: 5,
      variant: 1,
      y: 0,
    },
  },
  head: {
    width: 500,
    height: 650,
    radius: 50,
    eyes: false,
    mouth: false,
    hideNeck: false,
    strokeWidth: 5,
    stroke: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.DARK_GRAY,
    },
    fill: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.GRAY,
    },
    strokeEffects: [],
    effects: [],
  },
  back: {
    fill: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.LIGHT_GRAY,
    },
    effects: [],
  },
  effects: [],
  patterns: [],
  gradients: [],
}
export const configParamLength = 2048
export const encodedEmptyArray = encode([])
export const uint8EncodedArray = new Uint8Array(encodedEmptyArray)
export const configParamUint8Encoded = new Uint8Array(encode(serialize(defaultConfigParam)))

export function serialize({ palette, face, head: headNullable, back: backNullable, effects, patterns, gradients }: ConfigParam) {
  const head = isEmpty(headNullable) ? defaultConfigParam.head : headNullable
  const back = isEmpty(backNullable) ? defaultConfigParam.back : backNullable
  return [
    [ // palette
      palette.seed,
      palette.hueShift,
    ],
    [ // face
      [
        face.eyes.size,
        face.eyes.variant,
        face.eyes.y,
        face.eyes.mirror,
      ],
      [
        face.mouth.size,
        face.mouth.variant,
        face.mouth.y,
      ],
    ],
    [ // head
      head.width,
      head.height,
      head.radius,
      head.eyes,
      head.mouth,
      head.hideNeck,
      head.strokeWidth,
      [
        head.stroke.type,
        head.stroke.id,
      ],
      [
        head.fill.type,
        head.fill.id,
      ],
      head.strokeEffects,
      head.effects,
    ],
    [ // back
      [
        back.fill.type,
        back.fill.id,
      ],
      back.effects,
    ],
    effects,
    patterns,
    gradients,
  ] as const
}

export function deserialize(configRaw: ConfigParamSerialized): ConfigParam {
  const [palette, face, head, back, effects, patterns, gradients] = configRaw
  const [seed, hueShift] = palette
  const [
    [eyesSize, eyesVariant, eyesY, eyesMirror],
    [mouthSize, mouthVariant, mouthY],
  ] = face
  const [
    headWidth,
    headHeight,
    headRadius,
    headEyes,
    headMouth,
    headHideNeck,
    headStrokeWidth,
    [
      headStrokeType,
      headStrokeId,
    ],
    [
      headFillType,
      headFillId,
    ],
    headStrokeEffects,
    headEffects,
  ] = head
  const [
    [backFillType, backFillId],
    backEffects,
  ] = back

  return {
    palette: {
      seed,
      hueShift,
    },
    face: {
      eyes: {
        size: eyesSize,
        variant: eyesVariant,
        y: eyesY,
        mirror: eyesMirror,
      },
      mouth: {
        size: mouthSize,
        variant: mouthVariant,
        y: mouthY,
      },

    },
    head: {
      width: headWidth,
      height: headHeight,
      radius: headRadius,
      eyes: headEyes,
      mouth: headMouth,
      hideNeck: headHideNeck,
      strokeWidth: headStrokeWidth,
      stroke: {
        type: headStrokeType,
        id: headStrokeId,
      },
      fill: {
        type: headFillType,
        id: headFillId,
      },
      strokeEffects: headStrokeEffects,
      effects: headEffects,
    },
    back: {
      fill: {
        type: backFillType,
        id: backFillId,
      },
      effects: backEffects,
    },
    effects,
    patterns,
    gradients,
  }
}

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
