import { useEffect, useRef, useState } from 'react'
import { Card, Stack, Typography } from '@mui/joy'
import Slider from '@mui/joy/Slider'
import { useUnit } from 'effector-react'
import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Sheet from '@mui/joy/Sheet'
import { gradientModel } from './model'
import { Handle, HideOptions } from '@/shared/ui'
import RemoveIcon from '~icons/clarity/remove-solid'

export function Gradient({ gradient, deleteButton }) {
  const { updateGradient } = useUnit(gradientModel)
  const [open, setOpen] = useState(false)

  return <Card
    variant='outlined'
    sx={{ py: 1, mb: 0.5, borderRadius: 'sm' }}>
    <Stack
      sx={{ m: 0, p: 0 }}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <Typography level="body1" sx={{ mb: 0.5 }}>
        Gradient #{gradient.id}
      </Typography>
      <Stack direction='row'>
        <HideOptions open={open} setOpen={setOpen} />
        {deleteButton}
      </Stack>
    </Stack>

    {open
      && <>
        <SelectType id={gradient.id} />
        <Slider
          track={false}
          className='nodrag'
          valueLabelDisplay="auto"
          value={gradient.stops}
          onChange={(_, stops) => updateGradient({ ...gradient, stops })}
        />
      </>
    }

    <Handle
      id={gradient.id.toString()}
      type='source'
      position='right'
    />
  </Card>
}

export function SelectType({ id }) {
  return (
    <RadioGroup
      overlay
      aria-label="platform"
      defaultValue="Website"
      name="platform"
      sx={{
        flexDirection: 'row',
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: '3px solid',
            borderColor: 'primary.500',
          },
        },
        [`& .${radioClasses.radio}`]: {
          'display': 'contents',
          '& > svg': {
            zIndex: 2,
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            bgcolor: 'background.body',
            borderRadius: '50%',
          },
        },
      }}
    >
      {['linear', 'radial'].map(value => (
        <Sheet
          key={value}
          variant="outlined"
          sx={{
            borderRadius: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 100,
            height: 100,
          }}
        >
          <Radio id={value} value={value} checkedIcon={<RemoveIcon />} />
          <GradientCanvas id={id} type={value} />
        </Sheet>
      ))}
    </RadioGroup>
  )
}

export function GradientCanvas({ id, type }) {
  const { gradientsCanvas } = useUnit(gradientModel)
  const svgWrapper = useRef(null)

  useEffect(() => {
    if (gradientsCanvas[id])
      gradientsCanvas[id][type].addTo(svgWrapper.current)
  }, [svgWrapper, gradientsCanvas])

  return <svg
    style={{ width: '100%', height: '100%' }}
    viewBox={'0 0 100 100'}
    ref={svgWrapper}
  />
}
