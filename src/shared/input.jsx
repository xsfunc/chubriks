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

export function SelectInput({ label, name, value, onChange, options }) {
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
