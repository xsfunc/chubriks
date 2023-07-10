import { Position } from 'reactflow'
import { Sheet, Typography } from '@mui/joy'
import { Handle, NodeCard } from '@/shared/ui'

export function ResultNode({ children, data }) {
  return <>
    <NodeCard name='Result' sx={{ width: 540 }}>
      <Handle
        id='head'
        type="target"
        position={Position.Left}
      />

      {children}

      <Sheet sx={{ mx: -2, p: 2 }}>
        <Typography level='body2'>
          Background: color, pattern
        </Typography>
        <Handle
          id='background'
          isConnectable={data?.targetHandles.background.isConnectable}
          type="target"
          position={Position.Left}
        />
      </Sheet>
    </NodeCard>
  </>
}
