import type { defaultColors, fillingTypes } from './constants'

export type FillingType = typeof fillingTypes[keyof typeof fillingTypes] // ⊙﹏⊙ wtf man?
export interface FillingOptions { type: FillingType; id: number }
export type FillingSerialized = [FillingType, number]

export interface FillingFactory {
  types: Record<string, FillingType>
  defaultColorsIds: Record<string, number>
  defaultColors: typeof defaultColors
  palette: string[]

  serialize(options: FillingOptions): FillingSerialized
  deserialize(data: FillingSerialized): (FillingOptions)

  fillingByOptions(options: FillingOptions): string
  isPattern(options: FillingOptions): boolean
  isColor(options: FillingOptions): boolean
  isGradient(options: FillingOptions): boolean
}
