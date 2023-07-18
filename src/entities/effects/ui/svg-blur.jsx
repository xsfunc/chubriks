import { useUnit } from 'effector-react'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function SvgBlurEffect({ id, data }) {
  const { updateEffect } = useUnit(effectsModel)

  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='x'
      value={data.x}
      onChange={handleChange('x')}
      options={{ min: 1, max: 30 }}
    />
    <SliderWithLabel
      name='y'
      value={data.y}
      onChange={handleChange('y')}
      options={{ min: 1, max: 30 }}
    />
  </>
}
