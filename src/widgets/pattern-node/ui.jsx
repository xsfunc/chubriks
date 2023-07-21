import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { useUnit } from 'effector-react'
import { Handle, NodeCard } from '@/shared/ui'
import { deleteNode } from '@/features/delete-node'
import { AddPatternButton } from '@/features/add-pattern'
import { patternsModel } from '@/entities/patterns'

export function PatternNode({ id }) {
  const { patterns } = useUnit(patternsModel)

  return (
    <>
      <NodeCard
        name='Pattern'
        sx={{ mb: 0.5, pb: 1 }}
        onDelete={() => deleteNode(id)}
      >
        <Handle
          id="effects"
          type="source"
          position={Position.Right}
        />
      </NodeCard>
      <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
        <AddPatternButton nodeId={id} />
      </Card>
    </>
  )
}
