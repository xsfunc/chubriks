import { Input } from '@/shared/input'

export function Invert({ onChange, data }) {
  return <>
    <p>Invert</p>
    <Input
      name='amount'
      value={data.amount}
      onChange={onChange('amount')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
  </>
}
