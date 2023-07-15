import { Button, ListDivider, Menu, MenuItem } from '@mui/joy'
import { useRef } from 'react'
import { useUnit } from 'effector-react'
import { model } from './model'

export function AddNodeButton() {
  const buttonRef = useRef(null)
  const { menuOpen, openMenu, closeMenu, addNode } = useUnit(model)
  const handleClick = nodeType => event => addNode({ nodeType, event })
  return (
    <>
      <Button
        ref={buttonRef}
        onClick={openMenu}
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
        onClose={closeMenu}
        anchorEl={buttonRef.current}
        size="sm"
        sx={{ minWidth: 180 }}
        placement='right-end'
        id="add-node-menu"
        aria-labelledby="size-demo-button"
      >
        <MenuItem onClick={handleClick('eyes')}>
          Face
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleClick('pattern')}>
          Pattern
        </MenuItem>
        <MenuItem onClick={handleClick('effects')}>
          Effects
        </MenuItem>
        <MenuItem onClick={handleClick('gradient')}>
          Gradient
        </MenuItem>
      </Menu>
    </>
  )
}
