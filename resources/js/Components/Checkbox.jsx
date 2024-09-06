export default function Checkbox({ className = "", ...props }) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        "rounded border-black text-black shadow-sm focus:ring-black " +
        className
      }
    />
  );
}
