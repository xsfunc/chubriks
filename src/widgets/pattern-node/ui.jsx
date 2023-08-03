import { Position } from 'reactflow'
import { Card } from '@mui/joy'
import { useUnit } from 'effector-react'
import { Handle, NodeCard } from '@/shared/ui'
import { deleteNode } from '@/features/delete-node'
import { AddPatternButton } from '@/features/add-pattern'
import { PatternCard } from '@/entities/patterns'
import { paletteModel } from '@/entities/palette'
import { drawApi } from '@/shared/lib'

export function PatternNode({ id, data }) {
  const { palette } = useUnit(paletteModel)
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

        {data.id !== undefined
          && <PatternCard patternId={data.id} palette={palette} />
        }
      </NodeCard>

      {(data.type !== drawApi.fillingTypes.PATTERN)
        && <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
          <AddPatternButton nodeId={id} />
        </Card>
      }
    </>
  )
}
