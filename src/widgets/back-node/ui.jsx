import { memo } from 'react'
import { Handle, NodeCard } from '@/shared/ui'
import { deleteNode } from '@/features/delete-node'
import { TargetHandle } from '@/shared/ui/param-handle'

export function BackNode({ id }) {
  return <NodeCard
    name='Background'
    sx={{ mb: 0.5, pb: 1 }}
    onDelete={() => deleteNode(id)}
  >
    <TargetHandle
      name='Color, pattern'
      options={{
        id: 'fill',
        isConnectable: true,
      }}
    />
    <TargetHandle
      name='Effects'
      options={{
        id: 'effects',
        isConnectable: true,
      }}
    />
    <Handle
      id="main"
      type="source"
      position='right'
    />
  </NodeCard>
}

export const MemoBackNode = memo(BackNode, () => true)
