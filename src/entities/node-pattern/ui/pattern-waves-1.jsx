import { useUnit } from 'effector-react'
import { model } from '../model'
import { Input, SliderWithLabel } from '@/shared/ui'

export function Waves1Pattern({ id, data }) {
  const { updatePattenData } = useUnit(model)
  const onChange = param => (_, value) => updatePattenData({ id, data: { [param]: value } })
  return <>
    <SliderWithLabel
      label='Scale'
      name='scale'
      value={data.scale}
      onChange={onChange('scale')}
      options={{ min: 1, max: 10 }}
    />
    <SliderWithLabel
      label='Rotate'
      name='rotate'
      value={data.rotate}
      onChange={onChange('rotate')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <SliderWithLabel
      label='Stroke width'
      name='stroke-width'
      value={data.strokeWidth}
      onChange={onChange('strokeWidth')}
      options={{ type: 'range', min: 1, max: 9 }}
    />
    <Input
      name='backgroundColor'
      value={data.backgroundColor}
      onChange={onChange('backgroundColor')}
      options={{ type: 'color' }}
    />
  </>
}
