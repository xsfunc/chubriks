import { useUnit } from 'effector-react'
import { model } from '../internal-model'
import { SliderWithLabel } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'

export function CrossPattern({ id, data }) {
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

    <TargetHandle
      sx={{ mt: 1 }}
      name='Background: color'
      options={{
        id: 'background',
        isConnectable: true,
      }}
    />
    <TargetHandle
      name='Waves: color'
      options={{
        id: 'color1',
        isConnectable: true,
      }}
    />
  </>
}
