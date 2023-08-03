import type { Gradient } from '@svgdotjs/svg.js'
import type { defaultColors, fillingTypes, gradientTypesMap } from './constants'

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
export type GradientType = typeof gradientTypesMap[keyof typeof gradientTypesMap] // ⊙﹏⊙ wtf man?
export interface GradientOptions {
  id: number
  type: GradientType
  degree: number
  stops: number[]
  colors: number[]
}
