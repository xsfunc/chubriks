import { useUnit } from 'effector-react'
import { Position } from 'reactflow'
import { Option, Select } from '@mui/joy'
import { Handle, NodeCard, SliderWithLabel } from '@/shared/ui'
import { eyeVariants, flowManager } from '@/shared/lib'

export function EyesNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleEyeVariantChange = (_, newValue) => {
    const data = { variant: newValue }
    updateNodeData({ id, data })
  }
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  return (
    <NodeCard name='Eyes'>
      <SliderWithLabel
        name='size'
        label='Size'
        value={data.size}
        onChange={handleChange('size')}
        options={{ type: 'range', min: 50, max: 400 }}
      />
      <Select size='sm'
        defaultValue={1}
        className='nodrag'
        onChange={handleEyeVariantChange}
      >
        {eyeVariants.map((eye, i) => <Option key={i} value={i}>{`${eye} ${eye}`}</Option>)}
      </Select>

      <Handle type="source" position={Position.Right} id="main" />
    </NodeCard>
  )
}
