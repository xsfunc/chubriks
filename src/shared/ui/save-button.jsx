import { IconButton, Tooltip } from '@mui/joy'
import RemoveIcon from '~icons/bi/save'

export function SaveButton({ onClick }) {
  return <Tooltip title="Download image" variant="outlined">
    <IconButton
      onClick={onClick}
      aria-label="save"
      className='nodrag'
      variant="plain"
      color="neutral"
      size="sm"
    >
      <RemoveIcon />
    </IconButton>
  </Tooltip>
}
