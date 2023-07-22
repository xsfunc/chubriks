import { Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { faceModel } from '../model'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { eyeVariants } from '@/shared/lib'

export function Eyes() {
  const { updateEyes, eyes } = useUnit(faceModel)
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
      value={eyes.size}
      onChange={(_, size) => updateEyes({ size })}
      options={{ type: 'range', min: 50, max: 400 }}
    />
    <SliderWithLabel
      name='y'
      label='Vertical position'
      value={eyes.y}
      onChange={(_, y) => updateEyes({ y })}
      options={{ type: 'range', min: 50, max: 400 }}
    />
    <Select size='sm'
      defaultValue={1}
      className='nodrag'
      onChange={(_, variant) => updateEyes({ variant })}
    >
      {eyeVariants.map((eye, i) =>
        <Option key={i} value={i}>{`${eye} ${eye}`}</Option>)
      }
    </Select>
  </FaceElementCard>
}
