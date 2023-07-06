import { useUnit } from 'effector-react'
import { Handle, Input, NodeCard } from '@/shared/ui'
import { flowManager } from '@/shared/lib'

export function HeadNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  return (
    <NodeCard name='Head node'>
      <Input
        name='width'
        value={data.width}
        onChange={handleChange('width')}
        options={{ type: 'range', min: 400, max: 800 }}
      />
      <Input
        name='height'
        value={data.height}
        onChange={handleChange('height')}
        options={{ type: 'range', min: 400, max: 700 }}
      />
      <Input
        name='fill'
        value={data.fill}
        onChange={handleChange('fill')}
        options={{ type: 'color' }}
      />
      <Input
        name='stroke'
        value={data.stroke}
        onChange={handleChange('stroke')}
        options={{ type: 'color' }}
      />
      <Input
        name='strokeWidth'
        value={data.strokeWidth}
        onChange={handleChange('strokeWidth')}
        options={{ type: 'range', min: 1, max: 20 }}
      />
      <Input
        name='radius'
        value={data.radius}
        onChange={handleChange('radius')}
        options={{ type: 'range', min: 0, max: 100 }}
      />

      <Handle
        id="filters"
        type="target"
        isConnectableStart={false}
        position='left'
      />
      <Handle
        id="head"
        type="source"
        position='right'
      />
    </NodeCard>
  )
}
