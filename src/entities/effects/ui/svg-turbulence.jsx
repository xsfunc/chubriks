import { useUnit } from 'effector-react'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function SvgTurbulenceEffect({ id, numOctaves, baseFrequency }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='Base frequency'
      value={baseFrequency}
      onChange={handleChange('baseFrequency')}
      options={{ min: 0.15, max: 0.1 }}
    />
    <SliderWithLabel
      name='numOctaves'
      value={numOctaves}
      onChange={handleChange('numOctaves')}
      options={{ min: 0, max: 30 }}
    />
  </>
}
