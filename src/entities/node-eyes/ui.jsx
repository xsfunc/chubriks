import { useUnit } from 'effector-react'
import { Position } from 'reactflow'
import { Handle, Input, NodeCard } from '@/shared/ui'
import { flowManager } from '@/shared/lib'

export function EyesNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  return (
    <NodeCard name='Eyes'>
      <Input
        name='size'
        value={data.size}
        label='Eye size'
        onChange={handleChange('size')}
        options={{ type: 'range', min: 10, max: 200 }}
      />
      <Input
        name='radius'
        value={data.radius}
        label='Eye radius'
        onChange={handleChange('radius')}
        options={{ type: 'range', min: 1, max: 100 }}
      />

      <Handle type="source" position={Position.Right} id="head-source" />
    </NodeCard>
  )
}
