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
