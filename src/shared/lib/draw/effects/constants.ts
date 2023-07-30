export const FE = {
  BLEND: 0,
  BLUR: 1,
  TURBULENCE: 2,
  DISPLACEMENT: 3,
  COLOR_MATRIX: 4,
  COMPONENT_TRANSFER: 5,
} as const

export const feBlendMode = [
  'normal',
  'multiply',
  'screen',
  'darken',
  'lighten',
] as const

export const feColorMatrixVariant = [
  'matrix',
  'saturate',
  'hueRotate',
  'luminanceToAlpha',
] as const
