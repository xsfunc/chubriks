import { IconButton } from '@mui/joy'
import ArrowUp from '~icons/clarity/angle-line'

export function HideOptions({ open, setOpen }) {
  return <IconButton
    aria-label="delete node"
    variant="plain"
    color="neutral"
    size="sm"
    className='nodrag'
    style={{ transform: `rotate(${open ? 0 : 180}deg)` }}
    onClick={() => setOpen(!open)}
  >
    <ArrowUp />
  </IconButton>
}
