import { useUnit } from 'effector-react'
import { Input, Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function FeTurbulence({ id, seed, numOctaves, baseFrequency, turbulence }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <Typography level='body2' gutterBottom>
      Type
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={turbulence}
      onChange={handleChange('turbulence')}
      className='nodrag'
    >
      {['turbulence', 'fractalNoise'].map(mode =>
        <Option key={mode} value={mode}>
          {mode}
        </Option>)
      }
    </Select>

    <Typography level='body2' gutterBottom>
      Seed
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={seed}
      onChange={event => updateEffect({ id, data: { seed: event.target.value } })}
      slotProps={{
        input: {
          type: 'number',
          min: 0,
          max: 255,
        },
      }}
    />

    <SliderWithLabel
      name='Base frequency'
      value={baseFrequency}
      onChange={handleChange('baseFrequency')}
      options={{ min: 0.002, max: 0.4, step: 0.001 }}
    />
    <SliderWithLabel
      name='numOctaves'
      value={numOctaves}
      onChange={handleChange('numOctaves')}
      options={{ min: 1, max: 5 }}
    />
  </>
}
