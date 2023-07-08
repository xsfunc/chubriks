import { useUnit } from 'effector-react'
import { Position } from 'reactflow'
import { Option, Select } from '@mui/joy'
import { Handle, NodeCard, SliderWithLabel } from '@/shared/ui'
import { flowManager, noseVariants } from '@/shared/lib'

export function NoseNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleVariantChange = (_, newValue) => {
    const data = { variant: newValue }
    updateNodeData({ id, data })
  }
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  return (
    <NodeCard name='Nose'>
      <SliderWithLabel
        name='size'
        label='Size'
        value={data.size}
        onChange={handleChange('size')}
        options={{ type: 'range', min: 50, max: 400 }}
      />
      <Select size='sm'
        defaultValue={0}
        className='nodrag'
        onChange={handleVariantChange}
      >
        {noseVariants.map((nose, i) => <Option key={i} value={i}>{nose}</Option>)}
      </Select>

      <Handle type="source" position={Position.Right} id="head-source" />
    </NodeCard>
  )
}
