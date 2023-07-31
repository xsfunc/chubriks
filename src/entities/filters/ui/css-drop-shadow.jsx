import { useUnit } from 'effector-react'
import { effectsModel } from '../../effects/model'
import { SliderWithLabel } from '@/shared/ui'

export function CssDropShadow({ id, ...props }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='x offset'
      value={props.xOffset}
      onChange={handleChange('xOffset')}
      options={{ min: 0, max: 50 }}
    />
    <SliderWithLabel
      name='y offset'
      value={props.yOffset}
      onChange={handleChange('yOffset')}
      options={{ min: 0, max: 50 }}
    />
    <SliderWithLabel
      name='Blur radius'
      value={props.blurRadius}
      onChange={handleChange('blurRadius')}
      options={{ min: 0, max: 30 }}
    />
  </>
}
