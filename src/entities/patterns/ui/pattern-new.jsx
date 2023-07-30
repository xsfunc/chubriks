import { useUnit } from 'effector-react'
import { patternsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'
import { drawApi } from '@/shared/lib'
import { ColorPicker } from '@/shared/ui/color-picker'

export function NewPattern({ id, data, palette }) {
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
      options={{ type: 'range', min: 0, max: 180 }}
    />

    <ColorPicker
      label='Background'
      palette={palette}
      value={data.color1.id}
      onChange={handleColorChange('color1')}
    />
    <ColorPicker
      label='Figure colors'
      palette={palette}
      value={data.color2.id}
      onChange={handleColorChange('color2')}
    />
  </>
}
