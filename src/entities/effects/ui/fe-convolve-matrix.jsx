import { useUnit } from 'effector-react'
import { Input } from '@mui/joy'
import { effectsModel } from '../model'

export function FeConvolveMatrix({ id, matrix }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    event => updateEffect({ id, data: { [param]: event.target.value } })

  return <>
    <Input
      sx={{ mt: 1 }}
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      value={matrix}
      onChange={handleChange('matrix')}
    />
  </>
}
