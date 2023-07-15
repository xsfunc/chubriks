import type { Node } from 'reactflow'
import type { EffectType } from '@/shared/lib'

export interface AddEffectEvent {
  id: string
  type: EffectType
}

export interface AddEffectFx extends AddEffectEvent {
  nodes: Node[]
}
