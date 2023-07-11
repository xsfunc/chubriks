import { styled } from '@mui/joy'
import { Handle as DefaultHandle } from 'reactflow'

export const Handle = styled(DefaultHandle)(
  ({ theme }) => ({
    borderColor: theme.palette.neutral[500],
    background: theme.palette.neutral.plainActiveBg,
    width: 10,
    height: 10,
  }),
)
