import { Card, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { HideOptions } from '@/shared/ui'

export function EffectCard({
  effectOptions,
  effectComponent,
  deleteEffect,
}) {
  const [open, setOpen] = useState(true)
  return <Card
    sx={{ py: 1, gap: 0, mb: 0.5, borderRadius: 'sm' }}
    variant='outlined'
  >
    <Stack
      sx={{ m: 0, p: 0 }}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <Stack gap={0.5} direction='row' >
        <Typography textOverflow='clip' level="body1" sx={{ mb: 0.5 }}>
          {effectOptions.name}
        </Typography>
        <Typography level="body1" color='neutral' sx={{ mb: 0.5 }}>
          ({effectOptions.id})
        </Typography>
      </Stack>
      <Stack direction='row'>
        <HideOptions open={open} setOpen={setOpen} />
        {deleteEffect}
      </Stack>
    </Stack>
    {open && effectComponent}
  </Card>
}
