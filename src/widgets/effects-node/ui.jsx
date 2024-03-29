import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { useList } from 'effector-react'
import { memo } from 'react'
import { effectsComponentsMap } from './lib'
import { Handle, NodeCard } from '@/shared/ui'
import { EffectCard, effectsModel } from '@/entities/effects'
import { AddEffectButton } from '@/features/add-effect'
import { DeleteEffectButton } from '@/features/delete-effect'
import { deleteNode } from '@/features/delete-node'

export function EffectsNode({ id }) {
  const effectsList = useList(
    effectsModel.effectsList,
    (effect) => {
      if (effect.nodeId !== id)
        return null

      const EffectComponent = effectsComponentsMap[effect.type]
      return <EffectCard
        effectOptions={effect}
        effectComponent={<EffectComponent {...effect} />}
        deleteEffect={<DeleteEffectButton effectId={effect.id} nodeId={id} />}
      />
    },
  )

  return (
    <>
      <NodeCard
        name='Effects'
        sx={{ mb: 0.5, pb: 1, width: 250 }}
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

export const MemoEffectsNode = memo(EffectsNode, () => true)
