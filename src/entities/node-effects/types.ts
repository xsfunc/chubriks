import type { Node } from 'reactflow'
import type { CssFilter, SvgFilter } from '@/shared/lib'
import type { NodeDataHandles } from '@/shared/lib/flow/types'

export interface EffectsNode extends Node {
  type: 'effectsNode'
  data: EffectsNodeData
}

export interface EffectsNodeData extends NodeDataHandles {
  prop: 'effects'
  cssFilters: CssFilter[]
  svgFilters: SvgFilter[]
}

export interface UpdateFilterProps {
  data: object
  filters: CssFilter[]
  filtersType: 'cssFilters'
  filterId: string
  nodeId: string
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
