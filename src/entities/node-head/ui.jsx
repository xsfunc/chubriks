import { useUnit } from 'effector-react'
import { Sheet } from '@mui/joy'
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
    <NodeCard name='Head' >
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

      <Sheet sx={{ mx: -2, px: 2 }}>
        Face (eyes, nose, mouth)
        <Handle
          id="face"
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
      {/* <Handle
        id="filters2"
        type="target"
        position='left'
      /> */}
      <Handle
        id="head"
        type="source"
        position='right'
      />
    </NodeCard>
  )
}
