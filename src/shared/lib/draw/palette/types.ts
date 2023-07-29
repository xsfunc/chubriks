export type PaintSerialized = [PaintType, number]
export type PaintOptions = DefaultColor | PaletteColor | Gradient
export type PaintType = 0 | 1 | 2
interface DefaultColor {
  type: 0
  id: number
}
interface PaletteColor {
  type: 1
  id: number
}
interface Gradient {
  type: 2
  id: number
}
