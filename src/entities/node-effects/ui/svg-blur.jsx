import { EffectCard } from './effect-card'
import { SliderWithLabel } from '@/shared/ui'

export function SvgBlurFilter({ onChange, x, y }) {
  return <EffectCard name={'Blur'}>
    <SliderWithLabel
      name='x'
      value={x}
      onChange={onChange('x')}
      options={{ min: 1, max: 30 }}
    />
    <SliderWithLabel
      name='y'
      value={y}
      onChange={onChange('y')}
      options={{ min: 1, max: 30 }}
    />
  </EffectCard>
}
