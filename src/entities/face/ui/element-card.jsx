import { Card, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { HideOptions } from '@/shared/ui'

export function FaceElementCard({
  name,
  children,
  handle,
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
      <Typography level="body1" sx={{ mb: 0.5 }}>
        {name}
      </Typography>
      <Stack direction='row'>
        <HideOptions open={open} setOpen={setOpen} />
      </Stack>
    </Stack>

    {open && children}
    {handle}
  </Card>
}
