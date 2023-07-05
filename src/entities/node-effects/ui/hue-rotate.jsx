import { Input } from '@/shared/ui'

export function HueRotate({ onChange, data }) {
  return <>
    <p>Hue-rotate</p>
    <Input
      name='amount'
      value={data.amount}
      onChange={onChange('amount')}
      options={{ type: 'range', min: 0, max: 360 }}
    />
  </>
}
