import { Card, IconButton, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { SliderWithLabel } from '@/shared/ui'
import RemoveIcon from '~icons/clarity/remove-solid'
import ArrowUp from '~icons/clarity/angle-line'

export function SvgBlurFilter({ onChange, x, y }) {
  const [open, setOpen] = useState(true)
  return <Card sx={{ py: 1, gap: 1, mb: 0.5, borderRadius: 'sm' }} variant='outlined'>
    <Stack sx={{ m: 0, p: 0 }} direction='row' alignItems='center' justifyContent='space-between'>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        Blur effect
      </Typography>
      <Stack direction='row'>
        <IconButton
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
        <IconButton
          aria-label="delete node"
          variant="plain"
          color="neutral"
          size="sm"
        >
          <RemoveIcon />
        </IconButton>
      </Stack>
    </Stack>
    {open && <>
      <SliderWithLabel
        name='x'
        value={x}
        onChange={onChange('x')}
        options={{ min: 1, max: 30 }}
      />
      <SliderWithLabel
        name='y'
        value={y}
        onChange={onChange('y')}
        options={{ min: 1, max: 30 }}
      />
    </>
    }
  </Card>
}
