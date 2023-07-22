import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { Handle, NodeCard } from '@/shared/ui'
import { deleteNode } from '@/features/delete-node'
import { AddPatternButton } from '@/features/add-pattern'
import { PatternCard } from '@/entities/patterns'

export function PatternNode({ id, data }) {
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
        {(data.pattern !== undefined)
          ? <PatternCard id={id} data={data} />
          : <AddPatternButton nodeId={id} />
        }
      </Card>
    </>
  )
}
