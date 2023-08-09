import { useUnit } from 'effector-react'
import { Textarea, Typography } from '@mui/joy'
import { effectsModel } from '../model'

export function FeConvolveMatrix({ id, matrix, matrixText }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = (event) => {
    const matrixText = event.target.value
    const matrix = convertTextAreaToNumbers(matrixText)
    updateEffect({
      id,
      data: {
        matrix,
        matrixText,
      },
    })
  }

  return <>
    <Typography level='body2' gutterBottom>
      Matrix
    </Typography>
    <Textarea
      size='sm'
      minRows={3}
      maxRows={5}
      placeholder="Type matrix here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={matrixText}
      onChange={handleChange}
    />
  </>
}

function convertTextAreaToNumbers(textAreaMatrix) {
  const numbers = []
  const rows = textAreaMatrix.split('\n')

  rows.forEach((row) => {
    const columns = row.trim().split(/\s+/)
    columns.forEach((column) => {
      numbers.push(Number.parseFloat(column))
    })
  })

  return numbers
}
