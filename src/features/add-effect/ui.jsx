import { Button, Menu, MenuItem } from '@mui/joy'
import { useRef, useState } from 'react'
import { addEffect } from '.'

export function AddEffectButton({ nodeId }) {
  const [menuOpen, setOpen] = useState(false)
  const buttonRef = useRef(null)

  const handleClick = type =>
    () => {
      addEffect({ nodeId, type })
      setOpen(false)
    }

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpen(true)}
        className='nodrag'
        variant='soft'
        color='neutral'
        size='sm'
        fullWidth
        id="add-node-button"
        aria-controls="add-effect-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Add effect
      </Button>

      <Menu
        open={menuOpen}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        sx={{ minWidth: 180 }}
        id="add-effect-menu"
        size="sm"
      >
        <MenuItem onClick={handleClick('svg-blur')}>
          Blur
        </MenuItem>
        <MenuItem onClick={handleClick('svg-blur')}>
          Drop shadow
        </MenuItem>
      </Menu>
    </>
  )
}
