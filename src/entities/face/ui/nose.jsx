import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { faceModel } from '../model'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { noseVariants } from '@/shared/lib'

export function Nose() {
  const { nose, updateNose } = useUnit(faceModel)
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
      value={nose.size}
      onChange={(_, size) => updateNose({ size })}
      options={{ type: 'range', min: 50, max: 400 }}
    />
    <SliderWithLabel
      name='y'
      label='Vertical position'
      value={nose.y}
      onChange={(_, y) => updateNose({ y })}
      options={{ type: 'range', min: 50, max: 400 }}
    />
    <Select size='sm'
      className='nodrag'
      defaultValue={0}
      value={nose.variant}
      onChange={(_, variant) => updateNose({ variant })}
    >
      {noseVariants.map((nose, i) => <Option key={i} value={i}>{nose}</Option>)}
    </Select>
  </FaceElementCard>
}
