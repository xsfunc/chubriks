import { Input } from '@/shared/input'

export function DropShadow({ onChange, data }) {
  return <>
    <p>DropShadow</p>
    <Input
      name='y offset'
      value={data.yOffset}
      onChange={onChange('yOffset')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='x offset'
      value={data.xOffset}
      onChange={onChange('xOffset')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='blur radius'
      value={data.blurRadius}
      onChange={onChange('blurRadius')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
    <Input
      name='color'
      value={data.color}
      onChange={onChange('color')}
      options={{ type: 'color' }}
    />
  </>
}
