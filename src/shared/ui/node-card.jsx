import { Card, CardContent, IconButton, Stack, Typography } from '@mui/joy'
import CloneIcon from '~icons/clarity/clone-solid'
import RemoveIcon from '~icons/clarity/remove-solid'

export function NodeCard({ name, children, deletable = true, cloneable = true, sx = {} }) {
  return <Card
    variant='outlined'
    sx={{
      width: 230,
      fontSize: 'sm',
      borderRadius: 'sm',
      boxShadow: 'sm',
      gap: 1,
      p: 2,
      mb: 1,
      ...sx,
    }}
  >
    <Stack sx={{ m: 0, p: 0 }} direction='row' alignItems='center' justifyContent='space-between'>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {name}
      </Typography>
      <Stack direction='row'>

        {cloneable
          && <IconButton
            aria-label="delete node"
            variant="plain"
            color="neutral"
            size="sm"
          >
            <CloneIcon />
          </IconButton>
        }
        {deletable && <IconButton
          aria-label="delete node"
          variant="plain"
          color="neutral"
          size="sm"
        >
          <RemoveIcon />
        </IconButton>
        }
      </Stack>
    </Stack>

    {/* <Divider /> */}
    <CardContent orientation='vertical'>
      {children}
    </CardContent>
  </Card >
}
