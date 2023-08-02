import type { Gradient } from '@svgdotjs/svg.js'
import type { defaultColors, fillingTypes, gradientTypesIds } from './constants'

export type FillingType = typeof fillingTypes[keyof typeof fillingTypes] // ⊙﹏⊙ wtf man?
export interface FillingOptions { type: FillingType; id: number }
export type FillingSerialized = [FillingType, number]

export interface CreateFillingFactoryOptions {
  palette: string[]
  gradients: GradientOptions[]
}
export interface FillingFactory {
  types: Record<string, FillingType>
  defaultColorsIds: Record<string, number>
  defaultColors: typeof defaultColors
  palette: string[]
  gradients: GradientOptions[]

  serialize(options: FillingOptions): FillingSerialized
  deserialize(data: FillingSerialized): (FillingOptions)

  fillingByOptions(options: FillingOptions): string | Gradient
  isPattern(options: FillingOptions): boolean
  isColor(options: FillingOptions): boolean
  isGradient(options: FillingOptions): boolean
}

export type GradientOptions = LinearGradient | RadialGradient
export interface LinearGradient {
  id: number
  type: typeof gradientTypesIds.LINEAR
  degree: number
  stops: number[]
  colors: number[]
}
export interface RadialGradient {
  id: number
  type: typeof gradientTypesIds.RADIAL
  cx?: number
  cy?: number
  stops: number[]
  colors: number[]
}
