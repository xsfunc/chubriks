import { Sheet, Typography } from '@mui/joy'
import { Position } from 'reactflow'
import { Handle } from './handle-styled'

export function TargetHandle({ options, children, name, sx = {} }) {
  return <Sheet sx={{ mb: 0, mx: -2, px: 2, ...sx }}>
    <Typography level='body2'>
      {name}
    </Typography>
    {children}
    <Handle
      id={options.id}
      isConnectable={options.isConnectable}
      position={Position.Left}
      type="target"
    />
  </Sheet>
}
