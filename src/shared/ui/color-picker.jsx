import { Box, Radio, RadioGroup, Sheet, Typography } from '@mui/joy'
import { radioClasses } from '@mui/joy/Radio'

export function ColorPicker({
  label = 'Color',
  palette,
  value,
  onChange,
}) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography level='body2' sx={{ mb: 1 }}>
        {label}
      </Typography>

      <RadioGroup
        sx={{ gap: 1, flexWrap: 'wrap', flexDirection: 'row' }}
        onChange={onChange}
        value={value.toString()}
      >
        {palette.map((color, i) => (
          <Sheet
            className='nodrag'
            key={color}
            sx={{
              'position': 'relative',
              'width': 20,
              'height': 20,
              'flexShrink': 0,
              'borderRadius': '50%',
              'backgroundColor': color,
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              '--joy-focus-outlineOffset': '2px',
              '--joy-palette-focusVisible': theme => theme.vars.palette.neutral.outlinedBorder,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  '--variant-borderWidth': '2px',
                  'borderColor': 'text.secondary',
                },
              },
              [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                outlineWidth: '2px',
              },
            }}
          >
            <Radio
              value={i.toString()}
              color="neutral"
              disableIcon
              overlay
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  )
}
