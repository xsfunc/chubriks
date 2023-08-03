export const fillingTypes = {
  DEFAULT: 0,
  PALETTE: 1,
  GRADIENT: 2,
  PATTERN: 3,
} as const

export const defaultColorsIds = {
  BLACK: 0,
  WHITE: 1,
  GRAY: 2,
  LIGHT_GRAY: 3,
  DARK_GRAY: 4,
} as const

export const defaultColors = ['#212529', '#F8F9FA', '#ADB5BD', '#DEE2E6', '#343A40'] as const

export const gradientTypesNames = ['linear', 'radial'] as const
export const gradientTypes = [0, 1] as const
export const gradientTypesMap = {
  LINEAR: 0,
  RADIAL: 1,
} as const
