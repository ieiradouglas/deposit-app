export default function Input({ type, placeholder, onChange, className }) {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} className={className + " "} />
  )
}

