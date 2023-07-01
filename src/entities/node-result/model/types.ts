import type { Edge, Node } from 'reactflow'

export interface CanvasProps {
  size: number
  cx: number
  cy: number
  draw: unknown
}

export interface CompositionProps {
  hair?: HairProps
  face?: FaceProps
  background?: BackgroundProps
}

interface HairProps {
  variant: string
  filters: SvgFilter[]
  pattern: PatternProps
}

export interface FaceProps {
  fill: string
  stroke: string
  strokeWidth: number
  width: number
  height: number
  radius: number
  eyes?: EyesProps
  nose?: NoseProps
  mouth?: MouthProps
  filters?: SvgFilter[]
  pattern?: PatternProps
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
  type: 'blur'
  data: {
    amount: number
  }
}

export type SvgFilter = BlurSvgFilter

export interface CompositionFromNodeProps {
  rootNode: Node
  nodes: Node[]
  edges: Edge[]
}

export interface DrawFaceProps {
  canvas: CanvasProps
  composition: CompositionProps
}
