import { useUnit } from 'effector-react'
import { Sheet } from '@mui/joy'
import { Handle, Input, NodeCard, SliderWithLabel } from '@/shared/ui'
import { flowManager } from '@/shared/lib'

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

      <Sheet sx={{ mx: -2, px: 2 }}>
       Eyes
        <Handle
          id="eyes"
          type="target"
          position='left'
          isConnectableStart={false}
        />
      </Sheet>
      <Sheet sx={{ mx: -2, px: 2 }}>
        Nose
        <Handle
          id="nose"
          type="target"
          position='left'
          isConnectableStart={false}
        />
      </Sheet>
      <Sheet sx={{ mx: -2, px: 2 }}>
        Mouth
        <Handle
          id="mouth"
          type="target"
          position='left'
          isConnectableStart={false}
        />
      </Sheet>
      <Sheet sx={{ mx: -2, p: 2 }}>
        Stroke (color, pattern)
        <Handle
          id="stroke"
          type="target"
          position='left'
          isConnectableStart={false}
        />
      </Sheet>
      <Sheet sx={{ mx: -2, px: 2 }}>
        Fill (color, pattern)
        <Handle
          id="fill"
          type="target"
          position='left'
          isConnectableStart={false}
        />
      </Sheet>

      <Handle id="main" type="source" position='right' />
    </NodeCard>
  )
}
