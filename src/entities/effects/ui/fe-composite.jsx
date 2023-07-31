import { useUnit } from 'effector-react'
import { Option, Select, Typography } from '@mui/joy'
import { effectsModel } from '../model'
import { drawApi } from '@/shared/lib'

export function FeComposite({ id, in1, in2, operator }) {
  const { updateEffect, inputEffectsIds } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <Typography level='body2' gutterBottom>
      Operator
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={operator}
      onChange={handleChange('operator')}
      className='nodrag'
    >
      {drawApi.fe.compositeOperator.map(operator =>
        <Option key={operator} value={operator}>
          {operator}
        </Option>)
      }
    </Select>

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
  </>
}
