import { Button } from '@mui/joy'
import { addGradient } from './model'

export function AddGradientButton() {
  return (
    <>
      <Button
        onClick={() => addGradient()}
        className='nodrag'
        variant='soft'
        color='neutral'
        size='sm'
        fullWidth
        id="add-gradient-button"
      >
        Add gradient
      </Button>
    </>
  )
}
