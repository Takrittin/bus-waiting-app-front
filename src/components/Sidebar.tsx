import { Map, Star, History, Settings } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: Map, label: "Map", active: true },
    { icon: Star, label: "Saved", active: false },
    { icon: History, label: "Recent", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col items-center py-6 w-16 bg-white/95 backdrop-blur-md border-r border-[var(--color-outline-variant)] absolute top-16 bottom-0 left-0 z-10 gap-8 h-[calc(100vh-4rem)] shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-6 w-full items-center mt-4">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                className={`p-2 rounded-lg transition-colors relative ${
                  item.active
                    ? "text-[var(--color-primary)]"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title={item.label}
              >
                {item.active && (
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-1 h-6 bg-[var(--color-primary)] rounded-r-md"></div>
                )}
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden flex justify-around items-center h-16 bg-white/95 backdrop-blur-md border-t border-[var(--color-outline-variant)] absolute bottom-0 left-0 right-0 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] pb-safe">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className={`flex flex-col items-center gap-1 p-2 ${
                item.active ? "text-[var(--color-primary)]" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-labels uppercase font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
