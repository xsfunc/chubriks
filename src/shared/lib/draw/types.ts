import type { Svg } from '@svgdotjs/svg.js'
import type { Edge, Node } from 'reactflow'
import type { HeadProps } from './layers/head.types'
import type { PatternWave1Options } from './patterns/types'

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

interface HairProps {
  size: number
  variant: number
}

export type EffectsType = keyof EffectsProps
export interface EffectsProps {
  svgFilters: SvgFilter[]
  cssFilters: CssFilter[]
}

type BackgroundProps = ColorProps | PatternProps
export interface ColorProps {
  type: 'color'
  color: string
  opacity?: number
}

export type PatternProps = { type: 'pattern' } & PatternWave1Props
interface PatternWave1Props extends PatternWave1Options {
  patternType: 'wave1'
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

export type SvgFilter = BlurSvgFilter
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
