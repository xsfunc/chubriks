import { Input } from '@/shared/ui'

export function SvgBlurFilter({ onChange, data }) {
  return <>
    <p>Blur filter:</p>
    <Input
      name='x'
      value={data.x}
      onChange={onChange('x')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='y'
      value={data.y}
      onChange={onChange('y')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
  </>
}
