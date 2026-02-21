export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm",
        "outline-none focus:border-zinc-300 focus:ring-4 focus:ring-zinc-900/10",
        "placeholder:text-zinc-400",
        className,
      ].join(" ")}
      {...props}
    />
  );
}