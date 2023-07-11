import { Position } from 'reactflow'
import { Sheet, Typography } from '@mui/joy'
import { Handle, NodeCard } from '@/shared/ui'

export function ResultNode({ children, data }) {
  return <>
    <NodeCard
      name='Result'
      deletable={false}
      cloneable={false}
      sx={{ width: 540 }}>
      {children}

      <Sheet sx={{ mb: 0.5, mx: -2, px: 2 }}>
        <Typography level='body2'>
          Head
        </Typography>
        <Handle
          id='head'
          type="target"
          position={Position.Left}
          isConnectable={data?.targetHandles.head.isConnectable}
        />
      </Sheet>
      <Sheet sx={{ mb: 0.5, mx: -2, px: 2 }}>
        <Typography level='body2'>
          Background: color, pattern
        </Typography>
        <Handle
          id='background'
          type="target"
          position={Position.Left}
          isConnectable={data?.targetHandles.background.isConnectable}
        />
      </Sheet>
    </NodeCard>
  </>
}
