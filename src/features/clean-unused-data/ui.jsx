import { IconButton, Tooltip } from '@mui/joy'
import { useUnit } from 'effector-react'
import { cleanUnused } from './model'
import CleanIcon from '~icons/carbon/clean'

export function CleanButton() {
  const onClean = useUnit(cleanUnused)
  return <Tooltip title='Clean unused data' variant="outlined">
    <IconButton
      onClick={() => onClean()}
      aria-label="delete"
      className='nodrag'
      variant="outlined"
      color="neutral"
      size="sm"
    >
      <CleanIcon />
    </IconButton>
  </Tooltip>
}
