import type { Node } from 'reactflow'
import type { CssFilter, SvgFilter } from '@/shared/lib'

export interface EffectsNode extends Node {
  type: 'effectsNode'
  data: {
    prop: 'effects'
    cssFilters: CssFilter[]
    svgFilters: SvgFilter[]
  }
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
