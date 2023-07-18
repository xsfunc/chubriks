import { useUnit } from 'effector-react'
import { Box, Card, Input } from '@mui/joy'
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
      <Card key={color} sx={{ borderRadius: 'sm', py: 1, mb: 0.5 }} variant='outlined'>
        <Box sx={{
          borderRadius: 'xs',
          backgroundColor: color,
          height: 10,
        }} />
        <Handle
          id={i}
          type='source'
          position='right'
        />
      </Card>,
    )}
  </>
}
