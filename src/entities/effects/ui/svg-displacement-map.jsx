import { useUnit } from 'effector-react'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function SvgDisplacementMapEffect({ id, scale }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='Base frequency'
      value={scale}
      onChange={handleChange('scale')}
      options={{ min: 0, max: 10 }}
    />

  </>
}
