export default function Select({ name, children, onClick, onChange }) {
  return (
    <select name={name} onChange={onChange} onClick={onClick} className=" w-[199px] border border-black p-2 rounded-sm">
      {children}
    </select>
  )
}