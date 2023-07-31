import { useUnit } from 'effector-react'
import { Input, Typography } from '@mui/joy'
import { effectsModel } from '../model'

export function FeConvolveMatrix({ id, matrix }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    event => updateEffect({ id, data: { [param]: event.target.value.split(' ') } })

  return <>
    <Typography level='body2' gutterBottom>
      Matrix
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={matrix?.join(' ')}
      onChange={handleChange('matrix')}
    />
  </>
}
