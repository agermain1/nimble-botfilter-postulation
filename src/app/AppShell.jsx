export default function AppShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Topbar */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="w-full px-4 py-4 lg:px-6 xl:px-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600" />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">{title}</h1>
              {subtitle ? (
                <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="w-full px-4 py-6 lg:px-6 xl:px-8">{children}</main>
    </div>
  );
}