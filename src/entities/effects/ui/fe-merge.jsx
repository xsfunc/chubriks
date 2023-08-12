import { useUnit } from 'effector-react'
import { Box, Button, Option, Select } from '@mui/joy'
import { Fragment } from 'react'
import { effectsModel } from '../model'
import { drawApi } from '@/shared/lib'

export function FeMerge({ id, array }) {
  const { updateEffect, inputEffectsIds } = useUnit(effectsModel)

  const handleChange = index => (_, value) => {
    const newInArray = [...array]
    newInArray[index] = (value)
    updateEffect({ id, data: { array: newInArray } })
  }
  const handleAddInput = () => {
    updateEffect({ id, data: { array: [...array, 0] } })
  }

  return <>
    <Box sx={{ my: 1, mb: 0 }} />
    {array.map((value, index) =>
      <Fragment key={index}>
        <Select
          value={value}
          onChange={handleChange(index)}
          className='nodrag'
          sx={{ mb: 1 }}
          size='sm'
        >
          {inputEffectsIds.map((id, i) =>
            <Option key={i} value={id}>
              {drawApi.fe.formatInputId(id)}
            </Option>)
          }
        </Select>
      </Fragment>,
    )}

    <Button
      onClick={handleAddInput}
      variant='outlined'
      color='neutral'
      size='sm'
    >
      Add input
    </Button>

  </>
}
