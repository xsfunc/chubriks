import { Input } from '@/shared/ui'

export function Sepia({ onChange, data }) {
  return <>
    <p>Sepia</p>
    <Input
      name='amount'
      value={data.amount}
      onChange={onChange('amount')}
      options={{ type: 'range', min: 1, max: 100 }}
    />
  </>
}
