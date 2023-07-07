import { Position } from 'reactflow'
import { Handle, NodeCard } from '@/shared/ui'

export function ResultNode({ children }) {
  return <>
    <NodeCard name='Result' sx={{ width: 540 }}>
      <Handle
        type="target"
        position={Position.Left}
        id='leftEye'
      />
      <Handle type="target" position={Position.Left} id='rightEye' />
      {children}
    </NodeCard>
  </>
}
