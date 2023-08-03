import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { faceModel } from '../model'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { mouthPaths } from '@/shared/lib'

export function Mouth() {
  const { mouth, updateMouth } = useUnit(faceModel)
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
    <Select size='sm'
      defaultValue={0}
      className='nodrag'
      onChange={(_, variant) => updateMouth({ variant })}
    >
      {mouthPaths.map((_, i) =>
        <Option key={i} value={i}>Variant {i + 1}</Option>,
      )}
    </Select>
    <SliderWithLabel
      name='size'
      label='Size'
      value={mouth.size}
      onChange={(_, size) => updateMouth({ size })}
      options={{ type: 'range', min: 3, max: 10 }}
    />
    <SliderWithLabel
      name='y'
      label='Vertical position'
      value={mouth.y}
      onChange={(_, y) => updateMouth({ y })}
      options={{ type: 'range', min: -100, max: 100 }}
    />

  </FaceElementCard>
}
