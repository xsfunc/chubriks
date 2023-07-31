import { useUnit } from 'effector-react'
import { effectsModel } from '../model'
import { SliderWithLabel } from '@/shared/ui'

export function CssInvert({ id, ...props }) {
  const { updateEffect } = useUnit(effectsModel)
  const handleChange = param =>
    (_, value) => updateEffect({ id, data: { [param]: value } })

  return <>
    <SliderWithLabel
      name='Amount'
      value={props.amount}
      onChange={handleChange('amount')}
      options={{ min: 0, max: 100 }}
    />
  </>
}
