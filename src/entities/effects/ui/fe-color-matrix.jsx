import { useUnit } from 'effector-react'
import { Input, Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { drawApi } from '@/shared/lib'

export function FeColorMatrix({ id, in1, variant, value }) {
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
      Type
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={variant}
      className='nodrag'
      onChange={handleChange('variant')}
    >
      {drawApi.fe.feColorMatrixVariant.map((variant, i) =>
        <Option key={i} value={variant}>
          {variant}
        </Option>)
      }
    </Select>

    <Typography level='body2' gutterBottom>
      Value
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={value}
      onChange={event => updateEffect({ id, data: { value: event.target.value } })}
    />
  </>
}
