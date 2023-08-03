import { useEffect, useRef, useState } from 'react'
import { Card, Stack, Typography } from '@mui/joy'
import Slider from '@mui/joy/Slider'
import { useUnit } from 'effector-react'
import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Sheet from '@mui/joy/Sheet'
import { gradientModel } from './model'
import { Handle, HideOptions, SliderWithLabel } from '@/shared/ui'
import CheckIcon from '~icons/clarity/check-circle-solid'
import { drawApi } from '@/shared/lib'

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
        Gradient ({gradient.id})
      </Typography>
      <Stack direction='row'>
        <HideOptions open={open} setOpen={setOpen} />
        {/* {deleteButton} */}
      </Stack>
    </Stack>

    {open
      && <>
        <SelectType gradient={gradient} />
        <Slider
          track={false}
          className='nodrag'
          valueLabelDisplay="auto"
          value={gradient.stops}
          onChange={(_, stops) => updateGradient({ ...gradient, stops })}
        />
        <SliderWithLabel
        name='ange'
          label='Angle'
          value={gradient.degree}
          onChange={(_, degree) => updateGradient({ ...gradient, degree })}
          options={{ type: 'range', min: 0, max: 360 }}
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

export function SelectType({ gradient }) {
  const { updateGradient } = useUnit(gradientModel)
  return (
    <RadioGroup
      overlay
      value={gradient.type.toString()}
      onChange={event => updateGradient({ ...gradient, type: Number(event.target.value) })}
      name="Gradient type"
      className='nodrag'
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
      {drawApi.gradients.types.map(value => (
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
          <Radio value={value.toString()} checkedIcon={<CheckIcon />} />
          <GradientCanvas id={gradient.id} type={value} />
        </Sheet>
      ))}
    </RadioGroup>
  )
}

export function GradientCanvas({ id, type }) {
  const { gradientsCanvas } = useUnit(gradientModel)
  const gradientTypeName = drawApi.gradients.typesNames[type]
  const svgWrapper = useRef(null)

  useEffect(() => {
    if (gradientsCanvas[id])
      gradientsCanvas[id][gradientTypeName].addTo(svgWrapper.current)
  }, [svgWrapper, gradientsCanvas])

  return <svg
    style={{ width: '100%', height: '100%' }}
    viewBox={'0 0 100 100'}
    ref={svgWrapper}
  />
}
