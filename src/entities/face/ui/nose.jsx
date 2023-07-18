import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { noseVariants } from '@/shared/lib'

export function Nose({ data }) {
  return <FaceElementCard
    name="Nose"
    handle={
      <Handle
        type="source"
        position={Position.Right}
        id="nose"
      />
    }
  >
    <SliderWithLabel
      name='size'
      label='Size'
      value={data.size}
      // onChange={handleChange('size')}
      options={{ type: 'range', min: 50, max: 400 }}
    />
    <Select size='sm'
      defaultValue={0}
      className='nodrag'
    // onChange={handleVariantChange}
    >
      {noseVariants.map((nose, i) => <Option key={i} value={i}>{nose}</Option>)}
    </Select>
  </FaceElementCard>
}
