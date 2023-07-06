import { styled } from '@mui/joy'
import { Handle as DefaultHandle } from 'reactflow'

export const Handle = styled(DefaultHandle)(
  ({ theme }) => ({
    // 'react-flow__handle': {
    background: '#ff005c',
    borderRadius: theme.vars.radius.xs,
    // border: theme.palette.neutral.outlinedBorder,
    width: 10,
    height: 10,
    // },
  }),
)
