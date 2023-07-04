import type { Node } from 'reactflow'
import type { CssFilter, FaceProps, SvgFilter } from '@/entities/node-result/model/types'

export interface FaceNode extends Node {
  type: 'faceNode'
  data: FaceNodeData
}
interface FaceNodeData extends FaceProps {
  prop: 'face'
}

export interface SvgFiltersNode extends Node {
  type: 'svgFiltersNode'
  data: {
    prop: 'effects'
    svgFilters: SvgFilter[]
  }
}
export interface CssFiltersNode extends Node {
  type: 'cssFiltersNode'
  data: {
    prop: 'effects'
    cssFilters: CssFilter[]
  }
}
export interface EffectsNode extends Node {
  type: 'effectsNode'
  data: {
    prop: 'effects'
    cssFilters: CssFilter[]
    svgFilters: SvgFilter[]
  }
}
