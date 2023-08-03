import { useUnit } from 'effector-react'
import { Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'
import { drawApi } from '@/shared/lib'

export function FeDisplacementMap({ id, in1, in2, scale, xChannelSelector, yChannelSelector }) {
  const { updateEffect, inputEffectsIds } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <Typography level='body2' gutterBottom>
      Input 1
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
      Input 2
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={in2}
      className='nodrag'
      onChange={handleChange('in2')}
    >
      {inputEffectsIds.map((id, i) =>
        <Option key={i} value={id}>
          {drawApi.fe.formatInputId(id)}
        </Option>)
      }
    </Select>

    <Typography level='body2' gutterBottom>
      X channel selector
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={xChannelSelector}
      className='nodrag'
      onChange={handleChange('xChannelSelector')}
    >
      {drawApi.fe.feDisplacementChannels.map((channel, i) =>
        <Option key={i} value={i}>
          {channel}
        </Option>)
      }
    </Select>
    <Typography level='body2' gutterBottom>
      Y channel selector
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={yChannelSelector}
      className='nodrag'
      onChange={handleChange('yChannelSelector')}
    >
      {drawApi.fe.feDisplacementChannels.map((channel, i) =>
        <Option key={i} value={i}>
          {channel}
        </Option>)
      }
    </Select>

    <SliderWithLabel
      name='Scale'
      value={scale}
      onChange={handleChange('scale')}
      options={{ min: 0, max: 40 }}
    />
  </>
}
