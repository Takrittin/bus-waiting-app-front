import { Search, User } from "lucide-react";

export default function TopNav() {
  return (
    <header className="absolute top-0 inset-x-0 h-16 glass z-20 flex items-center justify-between px-4 md:px-6 shadow-sm border-b border-[var(--color-outline-variant)]">
      <div className="flex items-center gap-4 md:gap-8">
        <h1 className="text-[var(--color-primary)] font-serif text-xl md:text-2xl tracking-wide uppercase font-semibold">
          Alexandria
        </h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--foreground)]/80">
          <a href="#" className="font-sans hover:text-[var(--color-primary)]">
            Schedules
          </a>
          <a href="#" className="font-sans text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-1">
            Routes
          </a>
          <a href="#" className="font-sans hover:text-[var(--color-primary)]">
            Stations
          </a>
          <a href="#" className="font-sans hover:text-[var(--color-primary)]">
            Alerts
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs font-labels text-[var(--foreground)]/60 uppercase tracking-wider font-semibold">
            Nearby Convenience
          </span>
          <button className="w-10 h-5 bg-[var(--color-primary-container)] rounded-full relative flex items-center transition-colors">
            <span className="w-4 h-4 bg-[var(--color-primary)] rounded-full absolute right-0.5"></span>
          </button>
        </div>

        <div className="hidden md:flex relative items-center">
          <Search className="w-4 h-4 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes..."
            className="pl-9 pr-4 py-2 bg-[var(--color-surface-lowest)] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[var(--color-primary)] w-56 lg:w-64 font-sans text-gray-700"
          />
        </div>

        <button className="w-8 h-8 rounded-full bg-[var(--color-surface-lowest)] flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[var(--color-outline-variant)]">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
