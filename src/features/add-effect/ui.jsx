import { Button, Divider, Menu, MenuItem, Typography } from '@mui/joy'
import { useRef, useState } from 'react'
import { addEffect } from '.'
import { drawApi } from '@/shared/lib'

const { effectMap } = drawApi

export function AddEffectButton({ nodeId }) {
  const [menuOpen, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const handleClick = type => () => {
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
        <Category text='input' topDivider={false} />
        <MenuItem onClick={handleClick(effectMap.TURBULENCE)}>
          Turbulence
        </MenuItem>

        <Category text={'Geometry manipulation'} />
        <MenuItem onClick={handleClick(effectMap.BLUR)}>
          Blur
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.OFFSET)}>
          Offset
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.DISPLACEMENT)}>
          Displacement map
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.CONVOLVE_MATRIX)}>
          Convolve matrix
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.MORPHOLOGY)}>
          Morphology
        </MenuItem>

        <Category text='Combine' />
        <MenuItem onClick={handleClick(effectMap.MERGE)}>
          Merge
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.BLEND)}>
          Blend
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.COMPOSITE)}>
          Composite
        </MenuItem>

        <Category text='Color manipulation' />
        <MenuItem onClick={handleClick(effectMap.COLOR_MATRIX)}>
          Color matrix
        </MenuItem>
        <MenuItem onClick={handleClick(effectMap.COMPONENT_TRANSFER)}>
          Component transfer
        </MenuItem>
      </Menu>
    </>
  )
}

function Category({ text, topDivider = true }) {
  return <>
    {topDivider && <Divider />}
    <Typography
      sx={{ mx: 1 }}
      level="body-xs"
      textTransform="uppercase"
      fontWeight="lg"
    >
      {text}
    </Typography>
    <Divider />
  </>
}
