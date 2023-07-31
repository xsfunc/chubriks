import { useUnit } from 'effector-react'
import { Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'
import { drawApi } from '@/shared/lib'

export function FeBlur({ id, in1, x, y }) {
  const { updateEffect, inputEffectsIds } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <Typography level='body2' gutterBottom>
      Input
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={in1}
      className='nodrag'
      onChange={handleChange('in1')}
    >
      {inputEffectsIds.map((id, i) =>
        <Option key={i} value={id}>
          {drawApi.fe.formatInputId(id)}
        </Option>)
      }
    </Select>

    <SliderWithLabel
      name='x'
      value={x}
      onChange={handleChange('x')}
      options={{ min: 0, max: 30 }}
    />
    <SliderWithLabel
      name='y'
      value={y}
      onChange={handleChange('y')}
      options={{ min: 0, max: 30 }}
    />
  </>
}
