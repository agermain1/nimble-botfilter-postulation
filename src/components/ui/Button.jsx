const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-900/60",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200",
  ghost:
    "bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-200",
};

export default function Button({
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
        "disabled:cursor-not-allowed disabled:opacity-70 transition-colors",
        variants[variant] || variants.primary,
        className,
      ].join(" ")}
      {...props}
    />
  );
}