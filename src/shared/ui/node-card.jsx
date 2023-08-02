import { Card, CardContent, Stack, Typography } from '@mui/joy'
import { DeleteButton } from './delete-button'

export function NodeCard({
  name,
  children,
  deletable = true,
  onDelete,
  sx = {},
}) {
  return <Card
    variant='outlined'
    sx={{
      width: 230,
      fontSize: 'sm',
      borderRadius: 'sm',
      boxShadow: 'sm',
      gap: 1,
      mb: 1,
      p: 2,
      ...sx,
    }}
  >
    <Stack sx={{ m: 0, p: 0 }} direction='row' alignItems='center' justifyContent='space-between'>
      <Typography level="h2" fontSize="md">
        {name}
      </Typography>
      {deletable && <DeleteButton onClick={onDelete} />}
    </Stack>
    <CardContent orientation='vertical'>
      {children}
    </CardContent>
  </Card >
}
