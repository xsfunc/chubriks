import type { Svg } from '@svgdotjs/svg.js'
import type { Edge, Node } from 'reactflow'
import type { HeadProps } from './layers/head.types'
import type { CrossPatternOptions, WavesPatternOptions } from './types'

export * from './patterns/types'
export * from './effects/types'

export interface CanvasProps {
  size: number
  cx: number
  cy: number
  draw: Svg
}

export interface CompositionProps {
  hair?: HairProps
  head?: HeadProps
  background: BackgroundProps
}

interface BackgroundProps {
  fill: FillingProps
  effects: string[]
}

interface HairProps {
  size: number
  variant: number
}

export type FillingProps = ColorProps | PatternProps

export type PatternProps = { type: 'pattern' } & (WavesPatternOptions | CrossPatternOptions)

export interface ColorProps {
  type: 'color'
  color: string
  opacity?: number
}

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
