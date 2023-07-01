import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { flowManager } from '../flow-manager'
import { Input } from '@/shared/input'

export function EyesNode({ id, data }) {
  const { updateNode } = useUnit(flowManager)
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNode({ id, data })
    }

  return (
    <div className="text-updater-node">
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
    </div>
  )
}
