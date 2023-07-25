import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { Handle, NodeCard, TargetHandle } from '@/shared/ui'
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
          id="main"
          type="source"
          position={Position.Right}
        />

        {data.patternId !== undefined
          && <>
            <PatternCard patternId={data.patternId} />
            <TargetHandle
              name='Color 1'
              options={{
                id: 'color1',
              }}
            />
            <TargetHandle
              name='Color 2'
              options={{
                id: 'color2',
              }}
            />
            <TargetHandle
              name='Color 3'
              options={{
                id: 'color3',
              }}
            />
          </>
        }
      </NodeCard>

      {(data.patternId === undefined)
        && <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
          <AddPatternButton nodeId={id} />
        </Card>
      }

    </>
  )
}
