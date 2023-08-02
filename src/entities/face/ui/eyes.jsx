import { Checkbox, Option, Select } from '@mui/joy'
import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { faceModel } from '../model'
import { FaceElementCard } from './element-card'
import { Handle, SliderWithLabel } from '@/shared/ui'
import { eyesPaths } from '@/shared/lib'

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
      options={{ type: 'range', min: 3, max: 10 }}
    />
    <SliderWithLabel
      name='y'
      label='Vertical position'
      value={eyes.y}
      onChange={(_, y) => updateEyes({ y })}
      options={{ type: 'range', min: -100, max: 200 }}
    />
    <Select
      sx={{ mb: 1 }}
      size='sm'
      defaultValue={1}
      className='nodrag'
      onChange={(_, variant) => updateEyes({ variant })}
    >
      {eyesPaths.map((_, i) =>
        <Option key={i} value={i}>{i + 1}</Option>)
      }
    </Select>
    <Checkbox
      className='nodrag'
      label="Mirror"
      checked={eyes.mirror}
      onChange={event => updateEyes({ mirror: event.target.checked })}
    />
  </FaceElementCard>
}
