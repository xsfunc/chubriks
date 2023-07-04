import { Input } from '@/shared/input'

export function GrayScale({ onChange, data }) {
  return <>
    <p>Grayscale</p>
    <Input
      name='amount'
      value={data.amount}
      onChange={onChange('amount')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
  </>
}
