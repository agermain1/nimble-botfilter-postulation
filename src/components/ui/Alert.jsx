export default function Alert({ variant = "info", children }) {
  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-zinc-200 bg-zinc-50 text-zinc-800";

  return <div className={`rounded-xl border px-3 py-2 text-sm ${styles}`}>{children}</div>;
}