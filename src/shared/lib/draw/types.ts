import type { Svg } from '@svgdotjs/svg.js'
import type { Edge, Node } from 'reactflow'
import type { HeadProps } from './layer-head.types'

export interface CanvasProps {
  size: number
  cx: number
  cy: number
  draw: Svg
}

export interface CompositionProps {
  hair?: HairProps
  face?: HeadProps
  background?: BackgroundProps
}

interface HairProps {
  variant: string
  filters: SvgFilter[]
  pattern: PatternProps
}

export type EffectsType = keyof EffectsProps
export interface EffectsProps {
  svgFilters: SvgFilter[]
  cssFilters: CssFilter[]
}

interface BackgroundProps {
  pattern: PatternProps
}

interface PatternProps {

}

interface EyesProps {
  radius: number
  size: number
  fill: string
}

interface NoseProps {
  size: number
  variant: string
}

interface MouthProps {
  size: number
  variant: string
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

export interface DrawFaceProps {
  canvas: CanvasProps
  composition: CompositionProps
}
