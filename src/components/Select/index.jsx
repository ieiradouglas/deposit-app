export default function Select({ children, onClick }) {
  return (
    <select onClick={onClick} className=" w-[199px] border border-black p-2 rounded-sm">
      {children}
    </select>
  )
}