import { Button } from '@mui/joy'
import { addGradient } from './model'

export function AddGradientButton({ nodeId }) {
  return (
    <>
      <Button
        onClick={() => addGradient({ nodeId })}
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
