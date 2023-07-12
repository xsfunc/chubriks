import { useUnit } from 'effector-react'
import { Handle, NodeCard, SliderWithLabel } from '@/shared/ui'
import { flowManager } from '@/shared/lib'
import { TargetHandle } from '@/shared/ui/param-handle'

export function HeadNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleChange = param =>
    (_, value) => {
      const data = { [param]: value }
      updateNodeData({ id, data })
    }

  return (
    <NodeCard name='Head' >
      <SliderWithLabel
        label='Width'
        name='width'
        value={data.width}
        onChange={handleChange('width')}
        options={{ type: 'range', min: 400, max: 800 }}
      />
      <SliderWithLabel
        label='Height'
        name='height'
        value={data.height}
        onChange={handleChange('height')}
        options={{ type: 'range', min: 400, max: 700 }}
      />
      <SliderWithLabel
        label='Stroke Width'
        name='strokeWidth'
        value={data.strokeWidth}
        onChange={handleChange('strokeWidth')}
        options={{ type: 'range', min: 1, max: 20 }}
      />
      <SliderWithLabel
        label='Radius'
        name='radius'
        value={data.radius}
        onChange={handleChange('radius')}
        options={{ type: 'range', min: 0, max: 100 }}
      />

      <TargetHandle
        name='Stroke: color, pattern'
        options={{
          id: 'stroke',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Background: color, pattern'
        options={{
          id: 'fill',
          isConnectable: true,
        }}
      />
      <TargetHandle
      sx={{ mb: 1 }}
        name='Effects'
        options={{
          id: 'effects',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Eyes'
        options={{
          id: 'eyes',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Nose'
        options={{
          id: 'nose',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Mouth'
        options={{
          id: 'mouth',
          isConnectable: true,
        }}
      />
      <Handle id="main" type="source" position='right' />
    </NodeCard>
  )
}
