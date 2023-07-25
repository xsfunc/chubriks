import { Button, Menu, MenuItem } from '@mui/joy'
import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { model } from './model'

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
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpen(true)}
        sx={{ boxShadow: 'md' }}
        variant='solid'
        size='sm'
        id="add-node-button"
        aria-controls={'add-node-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Add Node
      </Button>

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
    </>
  )
}
