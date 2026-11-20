export type AppTab = 'liturgi' | 'riwayat' | 'kidung' | 'ucapan';

interface TopBarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenSchedule: () => void;
}

const NAV_ITEMS: { id: AppTab; label: string }[] = [
  { id: 'liturgi', label: 'Tata Ibadah' },
  { id: 'riwayat', label: 'Riwayat Hidup' },
  { id: 'kidung', label: 'Nyanyian & Bacaan' },
  { id: 'ucapan', label: 'Ucapan & Doa' },
];

export function TopBar({ activeTab, onSelectTab, onOpenSchedule }: TopBarProps) {
  return (
    <header className="no-print sticky top-0 z-30 h-[56px] bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#E8E4DD]">
      <div className="max-w-6xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => onSelectTab('liturgi')}
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#2D3748] hover:text-[#755723] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] rounded"
        >
          Serene Grace
        </button>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navigasi Ibadah">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] rounded ${
                  isActive
                    ? 'text-[#755723]'
                    : 'text-[#596579] hover:text-[#2D3748]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#A38048]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSchedule}
            className="h-9 px-4 rounded-lg bg-[#755723] text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#5d420f] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] focus-visible:ring-offset-2"
          >
            Info Jadwal
          </button>
        </div>
      </div>
    </header>
  );
}
