import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { eyeVariants } from '@/shared/lib'

export function Eyes({ data }) {
  return <FaceElementCard
    name="Eyes"
    handle={
      <Handle
        type="source"
        position={Position.Right}
        id="eyes"
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
      defaultValue={1}
      className='nodrag'
    // onChange={handleEyeVariantChange}
    >
      {eyeVariants.map((eye, i) =>
        <Option key={i} value={i}>{`${eye} ${eye}`}</Option>)
      }
    </Select>
  </FaceElementCard>
}