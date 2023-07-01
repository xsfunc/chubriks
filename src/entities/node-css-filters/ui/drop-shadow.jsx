import { useUnit } from 'effector-react'
import { flowManager } from '@/entities/flow-manager'
import { Input } from '@/shared/input'

export function DropShadow({ id, nodeId, data }) {
  const { updateNodeFilter } = useUnit(flowManager)
  const handleChange = param =>
    event =>
      updateNodeFilter({
        data: { param: event.target.value },
        filterId: id,
        nodeId,
      })

  return <>
    Drop shadow
    <Input
      name='y offset'
      value={data.yOffset}
      onChange={handleChange('yOffset')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='x offset'
      value={data.xOffset}
      onChange={handleChange('xOffset')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='blur radius'
      value={data.blurRadius}
      onChange={handleChange('blurRadius')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='color'
      value={data.color}
      onChange={handleChange('color')}
      options={{ type: 'color' }}
    />
  </>
}
