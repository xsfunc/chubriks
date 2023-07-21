import { Button } from '@mui/joy'
import { useUnit } from 'effector-react'
import { patternsModel } from '@/entities/patterns'

export function AddPatternButton({ nodeId }) {
  const { addPattern } = useUnit(patternsModel)
  return (
    <>
      <Button
        onClick={() => addPattern({ nodeId, type: 'waves' })}
        className='nodrag'
        variant='soft'
        color='neutral'
        size='sm'
        fullWidth
        id="add-node-button"
        aria-controls="add-effect-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Add pattern
      </Button>
    </>
  )
}
