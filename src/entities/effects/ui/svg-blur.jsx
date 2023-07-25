import { useUnit } from 'effector-react'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function SvgBlurEffect({ id, x, y }) {
  const { updateEffect } = useUnit(effectsModel)

  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='x'
      value={x}
      onChange={handleChange('x')}
      options={{ min: 0, max: 30 }}
    />
    <SliderWithLabel
      name='y'
      value={y}
      onChange={handleChange('y')}
      options={{ min: 0, max: 30 }}
    />
  </>
}
