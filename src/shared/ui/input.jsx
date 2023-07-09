import { Slider, Typography } from '@mui/joy'

export function Input({ label, name, value, onChange, options }) {
  return <>
    <label htmlFor={name}>{label || name}</label>
    <input
      id={name}
      value={value}
      name={name}
      onChange={onChange}
      className="nodrag"
      {...options}
    />
  </>
}
export function SliderWithLabel({ label, name, value, onChange, options }) {
  return <>
    <Typography level='body2' gutterBottom={false}>
      {label || name}
    </Typography>
    <Slider
      name={name}
      className='nodrag'
      valueLabelDisplay="auto"
      onChange={onChange}
      value={value}
      sx={{ py: 1, mb: 0.5 }}
      {...options}
    />
  </>
}

export function SelectInput({ name, value, onChange, options }) {
  return <select
    style={{ width: 100 }}
    name={name}
    value={value}
    onChange={onChange}
  >
    {options.map((option, index) =>
      <option key={index} value={option}>{option}</option>,
    )}
  </select>
}
