import { Card, CardContent, IconButton, Typography } from '@mui/joy'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

export function NodeCard({ name, children, sx = {} }) {
  return <Card
    variant='outlined'
    sx={{
      width: 230,
      fontSize: 'sm',
      borderRadius: 'sm',
      boxShadow: 'sm',
      gap: 1,
      p: 2,
      ...sx,
    }}
  >
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
      {name}
    </Typography>
    <IconButton
      sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      aria-label="delete node"
      variant="plain"
      color="neutral"
      size="sm"
    >
      <RemoveCircleIcon />
    </IconButton>
    <CardContent orientation='vertical'>
      {children}
    </CardContent>
  </Card >
}
