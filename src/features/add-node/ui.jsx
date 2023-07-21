import { Button, Menu, MenuItem } from '@mui/joy'
import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { model } from './model'

export function AddNodeButton() {
  const [menuOpen, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const { addNode } = useUnit(model)
  const handleClick = nodeType => (event) => {
    setOpen(false)
    addNode({ nodeType, event })
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
        <MenuItem onClick={handleClick('faceNode')}>
          Face
        </MenuItem>
        <MenuItem onClick={handleClick('patternNode')}>
          Pattern
        </MenuItem>
        <MenuItem onClick={handleClick('effectsNode')}>
          Effects
        </MenuItem>
      </Menu>
    </>
  )
}
