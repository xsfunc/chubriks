import { useUnit } from 'effector-react'
import { Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'
import { drawApi } from '@/shared/lib'

export function FeMorphology({ id, in1, operator, radiusX, radiusY }) {
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

    <Typography level='body2' gutterBottom>
      Operator
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={operator}
      className='nodrag'
      onChange={handleChange('operator')}
    >
      {drawApi.fe.morphologyOperator.map((operator, i) =>
        <Option key={i} value={operator}>
          {operator}
        </Option>)
      }
    </Select>

    <SliderWithLabel
      name='Radius x'
      value={radiusX}
      onChange={handleChange('radiusX')}
      options={{ min: 0, max: 50 }}
    />
    <SliderWithLabel
      name='Radius y'
      value={radiusY}
      onChange={handleChange('radiusY')}
      options={{ min: 0, max: 50 }}
    />
  </>
}
