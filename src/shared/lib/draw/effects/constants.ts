export const FE = {
  BLEND: 0,
  BLUR: 1,
  TURBULENCE: 2,
  DISPLACEMENT: 3,
} as const

export const feBlendMode = [
  'normal',
  'multiply',
  'screen',
  'darken',
  'lighten',
] as const
