import { useUnit } from 'effector-react'
import { patternsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'
import { ColorPicker } from '@/shared/ui/color-picker'
import { drawApi } from '@/shared/lib'

export function LinePattern({ id, data, palette }) {
  const { updatePattern } = useUnit(patternsModel)
  const onChange = param => (_, value) => updatePattern({ id, data: { [param]: value } })
  const handleColorChange = param => event =>
    updatePattern({
      id,
      data: {
        [param]: {
          id: Number(event.target.value),
          type: drawApi.fillingTypes.PALETTE,
        },
      },
    })

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
    <ColorPicker
      label='Background'
      palette={palette}
      value={data.color1.id}
      onChange={handleColorChange('color1')}
    />
    <ColorPicker
      label='Line 1'
      palette={palette}
      value={data.color2.id}
      onChange={handleColorChange('color2')}
    />
    <ColorPicker
      label='Line 2'
      palette={palette}
      value={data.color3.id}
      onChange={handleColorChange('color3')}
    />
  </>
}