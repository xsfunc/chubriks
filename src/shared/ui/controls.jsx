import { styled } from '@mui/joy'
import { Controls as DefaultControls } from 'reactflow'

export const Controls = styled(DefaultControls)(
  ({ theme }) => ({
    button: {
      'backgroundColor': theme.vars.palette.background.body,
      'borderBottom': '1px solid',
      'borderColor': theme.vars.palette.neutral.outlinedBorder,
      'boxShadow': theme.vars.shadow.md,
      'fill': theme.vars.palette.neutral.plainColor,
      '&:hover': {
        fill: theme.vars.palette.neutral.plainHoverColor,
        backgroundColor: theme.vars.palette.neutral.plainHoverBg,
      },
      '&:active': {
        fill: theme.vars.palette.neutral.plainHoverColor,
        backgroundColor: theme.vars.palette.neutral.plainActiveBg,
      },
    },
  }),
)
