import { useUnit } from 'effector-react'
import { Input, Option, Select, Stack, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import { effectsModel } from '../model'
import { drawApi } from '@/shared/lib'
import { HideOptions } from '@/shared/ui'

const funcAOpen = { a: true, b: false, g: false, r: false }
const allFuncClosed = { a: false, b: false, g: false, r: false }
const valuesDefault = {
  identity: {},
  table: {
    tableValues: '1 0 1',
  },
  discrete: {
    tableValues: '1 0 1',
  },
  linear: {
    slope: 1.3,
    intercept: 0.1,
  },
  gamma: {
    amplitude: 1,
    exponent: 1,
    offset: 0,
  },
}

export function FeComponentTransfer({ id, in1, a, b, g, r }) {
  const [open, setOpen] = useState(funcAOpen)
  const { updateEffect, inputEffectsIds } = useUnit(effectsModel)

  const setChannelOpen = channel =>
    channelState => setOpen({ ...allFuncClosed, [channel]: channelState })
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <Typography level='body2' gutterBottom>
      Input
    </Typography>
    <Select
      sx={{ mb: 1 }}
      size='sm'
      value={in1}
      className='nodrag'
      onChange={handleChange('in1')}
    >
      {inputEffectsIds.map((id, i) =>
        <Option key={i} value={id}>
          {drawApi.fe.formatInputId(id)}
        </Option>)
      }
    </Select>

    <ComponentFunc
      effectId={id}
      open={open.a}
      setOpen={setChannelOpen('a')}
      funcChannel='a'
      type={a.type}
      values={a}
    />
    <ComponentFunc
      effectId={id}
      open={open.b}
      setOpen={setChannelOpen('b')}
      funcChannel='b'
      type={b.type}
      values={b}
    />
    <ComponentFunc
      open={open.g}
      effectId={id}
      funcChannel='g'
      setOpen={setChannelOpen('g')}
      type={g.type}
      values={g}
    />
    <ComponentFunc
      open={open.r}
      setOpen={setChannelOpen('r')}
      effectId={id}
      funcChannel='r'
      type={r.type}
      values={r}
    />
  </>
}

const funcMap = {
  identity: null,
  table: ComponentFuncTableAndDiscrete,
  discrete: ComponentFuncTableAndDiscrete,
  linear: ComponentFuncLinear,
  gamma: ComponentFuncGamma,
}
const funcTypes = Object.keys(funcMap)

function ComponentFunc({ open, setOpen, effectId, funcChannel, type, values }) {
  const [funcType, setType] = useState(type)
  const [funcValues, setValues] = useState(values)
  const { updateEffect } = useUnit(effectsModel)
  const FuncComponent = funcMap[type]

  // when type changed, set values to default
  useEffect(() => {
    setType(funcType)
    setValues(valuesDefault[funcType])
  }, [funcType])
  // when values changed update effect options
  useEffect(() => {
    updateEffect({
      id: effectId,
      data: {
        [funcChannel]: {
          ...funcValues,
          type: funcType,
        },
      },
    })
  }, [funcValues])

  return <>
    <Stack sx={{ mb: 0.5 }} direction='row' justifyContent='space-between'>
      <Typography level='body1' gutterBottom>
        Func{funcChannel.toUpperCase()}
      </Typography>
      <HideOptions open={open} setOpen={setOpen} />
    </Stack>

    {open && <Select
      sx={{ mb: 1 }}
      size='sm'
      value={type}
      className='nodrag'
      onChange={(_, value) => setType(value)}
    >
      {funcTypes.map(type =>
        <Option key={type} value={type}>
          {type}
        </Option>)
      }
    </Select>}

    {open && type !== 'identity' && <FuncComponent
      values={funcValues}
      setValues={setValues}
    />}
  </>
}

function ComponentFuncTableAndDiscrete({ values, setValues }) {
  return <>
    <Typography level='body2' gutterBottom>
      Table values
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.tableValues}
      onChange={event => setValues({ tableValues: event.target.value })}
    />
  </>
}

function ComponentFuncLinear({ values, setValues }) {
  return <>
    <Typography level='body2' gutterBottom>
      Slope
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.slope}
      onChange={event => setValues(values => ({ ...values, slope: event.target.value }))}
      slotProps={{
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 255,
        },
      }}
    />

    <Typography level='body2' gutterBottom>
      Intercept
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.intercept}
      onChange={event => setValues(values => ({ ...values, intercept: event.target.value }))}
      slotProps={{
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 255,
        },
      }}
    />
  </>
}

function ComponentFuncGamma({ values, setValues }) {
  return <>
    <Typography level='body2' gutterBottom>
      Amplitude
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.amplitude}
      onChange={event => setValues(values => ({ ...values, amplitude: event.target.value }))}
      slotProps={{
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 255,
        },
      }}
    />

    <Typography level='body2' gutterBottom>
      Exponent
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.exponent}
      onChange={event => setValues(values => ({ ...values, exponent: event.target.value }))}
      slotProps={{
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 255,
        },
      }}
    />

    <Typography level='body2' gutterBottom>
      Offset
    </Typography>
    <Input
      size='sm'
      placeholder="Type in here…"
      className='nodrag'
      sx={{ mb: 1 }}
      value={values?.offset}
      onChange={event => setValues(values => ({ ...values, offset: event.target.value }))}
      slotProps={{
        input: {
          type: 'number',
          step: 0.1,
          min: 0,
          max: 255,
        },
      }}
    />
  </>
}
