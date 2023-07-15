import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { Card } from '@mui/joy'
import { model } from '../model'
import type { Effect, EffectsNode as IEffectsNode } from '../types'
import { SvgBlurFilter } from './svg-blur'
import { Handle, NodeCard } from '@/shared/ui'

const effectsMap = {
  'svg-blur': SvgBlurFilter,
}

export function EffectsNode({ id, data }: IEffectsNode) {
  const { updateEffect, deleteEffect } = useUnit(model)

  const handleDelete = ({ effectId, effects }: any) =>
    (_: any, value: string) => {
      deleteEffect({
        nodeId: id,
        effectId,
        effects,
      })
    }

  const handleChange = ({ effectId, effects }: any) =>
    (param: string) =>
      (_: any, value: string) => {
        updateEffect({
          data: { [param]: value },
          nodeId: id,
          effects,
          effectId,
        })
      }

  return (
    <>
      <NodeCard name='Effects' sx={{ mb: 0.5, pb: 1 }}>
        <Handle
          id="effects"
          type="source"
          position={Position.Right}
        />
      </NodeCard>

      {data.effects.map((effect: Effect) => {
        const effects = data.effects
        const EffectComponent = effectsMap[effect.type]
        return <EffectComponent
          onChange={handleChange({ effectId: effect.id, effects })}
          key={effect.id}
          {...effect}
        />
      })}

      <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
      </Card>
    </>
  )
}
