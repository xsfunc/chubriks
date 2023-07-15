import { IconButton } from '@mui/joy'
import RemoveIcon from '~icons/clarity/remove-solid'

export function DeleteButton({ onClick }) {
  return <IconButton
    aria-label="delete"
    className='nodrag'
    variant="plain"
    color="neutral"
    size="sm"
  >
    <RemoveIcon onClick={onClick} />
  </IconButton>
}
