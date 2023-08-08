import { Box, Button, IconButton, Link, Menu, MenuItem } from '@mui/joy'
import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { model } from './model'
import HelpIcon from '~icons/charm/help'

export function AddNodeButton({ nodes }) {
  const buttonRef = useRef(null)
  const [menuOpen, setOpen] = useState(false)
  const { addNode } = useUnit(model)

  const handleClick = data => (event) => {
    setOpen(false)
    addNode({
      data,
      y: event.clientY - 150,
      x: event.clientX,
    })
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button
        ref={buttonRef}
        onClick={() => setOpen(true)}
        variant='solid'
        size='sm'
        id="add-node-button"
        aria-controls='add-node-menu'
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Add Node
      </Button>

      <Link
        href='https://www.fxhash.xyz/article/chubricks-tutorial'
        target='_blank'
      >
        <IconButton
          color='primary'
          variant="solid"
          size='sm'
        >
          <HelpIcon />
        </IconButton>
      </Link>

      <Menu
        open={menuOpen}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        size="sm"
        sx={{ minWidth: 180 }}
        placement='right-end'
        id="add-node-menu"
        aria-labelledby="size-demo-button"
      >
        {nodes.map(node =>
          <MenuItem key={node.name} onClick={handleClick(node.initial)}>
            {node.name}
          </MenuItem>,
        )}
      </Menu>
    </Box>
  )
}
