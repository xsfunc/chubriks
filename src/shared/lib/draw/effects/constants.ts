export const FE = {
  BLEND: 0,
  BLUR: 1,
  TURBULENCE: 2,
  DISPLACEMENT: 3,
  COLOR_MATRIX: 4,
  COMPONENT_TRANSFER: 5,
  COMPOSITE: 6,
  CONVOLVE_MATRIX: 7,
  MERGE: 8,
  FLOOD: 9,
  MORPHOLOGY: 10,
  OFFSET: 11,
} as const

export const sourceIds = [
  0,
  1,
] as const
export const sourceIdsMap = {
  0: 'SourceGraphic',
  1: 'SourceAlpha',
} as const

export const feBlendMode = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
] as const

export const feColorMatrixVariant = [
  'matrix',
  'saturate',
  'hueRotate',
  'luminanceToAlpha',
] as const

export const feCompositeOperator = [
  'over',
  'in',
  'out',
  'atop',
  'xor',
  'lighter',
  'arithmetic',
] as const

export const feMorphologyOperator = [
  'erode',
  'dilate',
] as const
