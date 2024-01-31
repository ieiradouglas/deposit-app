export default function Input({ type, placeholder, onChange, className, name }) {
  return (
    <input name={name} type={type} placeholder={placeholder} onChange={onChange} className={className + " "} />
  )
}

