import type { Container } from '@svgdotjs/svg.js'
import type { Edge, Node } from 'reactflow'

export * from './patterns/types'
export * from './effects/types'

export interface CanvasProps {
  size: number
  cx: number
  cy: number
  draw: Container
}

export interface CompositionProps {
  palette: {
    seed: number
    hueShift: number
  }
  head: HeadProps
  face: FaceProps
  back: BackProps
  colors: string[]
  effects: any[]
  patterns: any[]
}

interface BackProps {
  fill: FillingProps
  effects: string[]
}

export type FillingProps = PatternProps | ColorProps
export interface PatternProps {
  type: 'pattern'
  patternId: number
  color1: ColorProps
  color2: ColorProps
  color3: ColorProps
}
export type ColorProps = {
  type: 'color'
  opacity?: number
} & ({ color: string } | { colorId: number })

interface BlurSvgFilter {
  id: string
  type: 'blur'
  data: {
    x: number
    y: number
  }
}
interface DropShadowFilterProps {
  id: string
  onChange: () => void
}
interface DropShadowFilter {
  id: string
  type: 'dropShadow'
  data: {
    xOffset: number
    yOffset: number
    blurRadius: number
    color: string
  }
}
interface GrayscaleFilter {
  id: string
  type: 'grayscale'
  data: {
    amount: number
  }
}
interface SepiaFilter {
  id: string
  type: 'sepia'
  data: {
    amount: number
  }
}
interface HueRotateFilter {
  id: string
  type: 'hueRotate'
  data: {
    amount: number
  }
}
interface InvertFilter {
  id: string
  type: 'invert'
  data: {
    amount: number
  }
}

export type CssFilter = DropShadowFilter
| GrayscaleFilter
| SepiaFilter
| HueRotateFilter
| InvertFilter

export interface CompositionFromNodeProps {
  rootNode: Node
  nodes: Node[]
  edges: Edge[]
}

export interface DrawProps {
  canvas: CanvasProps
  composition: CompositionProps
}

export interface HeadProps {
  fill: FillingProps
  stroke: FillingProps
  strokeWidth: number
  width: number
  height: number
  radius: number
  strokeEffects: string[]
  effects: string[]
  eyes: boolean
  nose: boolean
  mouth: boolean
}

export interface FaceProps {
  eyes: EyesProps
  nose: NoseProps
  mouth: MouthProps
}
export interface FaceElement {
  variant: number
  size: number
  y: number
}
export type MouthProps = FaceElement
export type NoseProps = FaceElement
export interface EyesProps extends FaceElement {
  mirror: boolean
}
