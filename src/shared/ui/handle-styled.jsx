import { styled } from '@mui/joy'
import { Handle as DefaultHandle } from 'reactflow'

export const Handle = styled(DefaultHandle)(
  ({ theme }) => ({
    background: theme.palette.primary[500],
    borderRadius: theme.vars.radius.xs,
    width: 10,
    height: 10,
  }),
)
