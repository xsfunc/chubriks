import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { mouthVariants } from '@/shared/lib'

export function Mouth({ data }) {
  return <FaceElementCard
    name="Mouth"
    handle={
      <Handle
        type="source"
        position={Position.Right}
        id="mouth"
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
      {mouthVariants.map((mouth, i) =>
        <Option key={i} value={i}>{mouth}</Option>,
      )}
    </Select>
  </FaceElementCard>
}
