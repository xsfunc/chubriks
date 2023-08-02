import { useUnit } from 'effector-react'
import { Box, Card, Input, Typography } from '@mui/joy'
import { memo } from 'react'
import { Handle, NodeCard, SliderWithLabel } from '@/shared/ui'
import { paletteModel } from '@/entities/palette'

export function PaletteNode() {
  const {
    seed,
    setSeed,
    hueShift,
    setHueShift,
    palette,
  } = useUnit(paletteModel)

  return <>
    <NodeCard
      name='Color palette'
      cloneable={false}
      deletable={false}
      sx={{ mb: 0.5 }}
    >
      <SliderWithLabel
        label='Hue shift'
        value={hueShift}
        onChange={(_, value) => setHueShift(value)}
        options={{
          min: 0, max: 360,
        }}
      />
      <Typography level='body2'>
        Seed
      </Typography>
      <Input
        sx={{ mt: 1 }}
        size='sm'
        placeholder="Type in here…"
        className='nodrag'
        value={seed}
        onChange={event => setSeed(event.target.value)}
        slotProps={{
          input: {
            type: 'number',
            min: 0,
            max: 255,
          },
        }}
      />
    </NodeCard>

    {palette.map((color, i) =>
      <Card
        key={i}
        variant='outlined'
        sx={{ borderRadius: 'sm', py: 1, mb: 0.5 }}
      >
        <Box sx={{
          borderRadius: 'xs',
          backgroundColor: color,
          height: 10,
        }} />
        <Handle
          id={i.toString()}
          type='source'
          position='right'
        />
      </Card>,
    )}
  </>
}

export const MemoPaletteNode = memo(PaletteNode, () => true)
