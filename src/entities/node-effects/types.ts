import type { Node } from 'reactflow'
import type { CssFilter, EffectOptions } from '@/shared/lib'
import type { NodeDataHandles } from '@/shared/lib/flow/types'

export type Effect = { id: string } & EffectOptions

export interface EffectsNode extends Node {
  type: 'effectsNode'
  data: EffectsNodeData
}

export interface EffectsNodeData extends NodeDataHandles {
  effects: Effect[]
}

export interface UpdateEffectProps {
  data: object
  effects: Effect[]
  effectId: string
  nodeId: string
}

export interface SvgFiltersNode extends Node {
  type: 'svgFiltersNode'
  data: {
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

export type SvgFilter = BlurSvgFilter
export interface BlurSvgFilter extends EffectOptions {
  id: string
}
