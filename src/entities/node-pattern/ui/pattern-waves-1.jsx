import { Input } from '@/shared/input'

export function Waves1Pattern({ onChange, data }) {
  return <>
    <p>Wave 1</p>
    <Input
      name='scale'
      value={data.scale}
      onChange={onChange('scale')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='rotate'
      value={data.rotate}
      onChange={onChange('rotate')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='strokeWidth'
      value={data.strokeWidth}
      onChange={onChange('strokeWidth')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='backgroundColor'
      value={data.backgroundColor}
      onChange={onChange('backgroundColor')}
      options={{ type: 'color' }}
    />
  </>
}
