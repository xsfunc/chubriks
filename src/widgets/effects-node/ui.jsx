import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { useList } from 'effector-react'
import { Handle, NodeCard } from '@/shared/ui'
import { EffectCard, SvgBlurEffect, effectsModel } from '@/entities/effects'
import { AddEffectButton } from '@/features/add-effect'
import { DeleteEffectButton } from '@/features/delete-effect'
import { deleteNode } from '@/features/delete-node'

const effectsMap = {
  'svg-blur': SvgBlurEffect,
}

export function EffectsNode({ id }) {
  const effectsList = useList(
    effectsModel.effectsList,
    (effect) => {
      if (effect.nodeId !== id)
        return null

      const EffectComponent = effectsMap[effect.type]
      return <EffectCard
        name={effect.name}
        effect={<EffectComponent {...effect} />}
        deleteEffect={<DeleteEffectButton effectId={effect.id} nodeId={id}/>}
      />
    },
  )

  return (
    <>
      <NodeCard
        name='Effects'
        sx={{ mb: 0.5, pb: 1 }}
        onDelete={() => deleteNode(id)}
      >
        <Handle
          id="effects"
          type="source"
          position={Position.Right}
        />
      </NodeCard>
      {effectsList}
      <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
        <AddEffectButton nodeId={id} />
      </Card>
    </>
  )
}
