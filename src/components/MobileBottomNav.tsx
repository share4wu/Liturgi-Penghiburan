import { BookOpen, HeartHandshake, Music2, ScrollText } from 'lucide-react';
import { TAB_HASH_MAP, type AppTab } from './TopBar';

interface MobileBottomNavProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

const MOBILE_TABS: { id: AppTab; label: string; Icon: typeof ScrollText }[] = [
  { id: 'liturgi', label: 'Liturgi', Icon: ScrollText },
  { id: 'riwayat', label: 'Riwayat', Icon: BookOpen },
  { id: 'kidung', label: 'Kidung', Icon: Music2 },
  { id: 'ucapan', label: 'Ucapan', Icon: HeartHandshake },
];

export function MobileBottomNav({ activeTab, onSelectTab }: MobileBottomNavProps) {
  return (
    <nav
      className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 min-h-[60px] bg-[#FFFFFF]/96 backdrop-blur-md border-t border-[#E8E4DD]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Navigasi Utama Ponsel"
    >
      <div className="grid grid-cols-4 h-[60px] max-w-md mx-auto">
        {MOBILE_TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <a
              key={id}
              href={TAB_HASH_MAP[id]}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                onSelectTab(id);
              }}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:bg-[#FAF9F6] ${
                isActive ? 'text-[#755723]' : 'text-[#596579] hover:text-[#2D3748]'
              }`}
            >
              <Icon className="w-[19px] h-[19px]" strokeWidth={isActive ? 2.2 : 1.7} />
              <span
                className={`text-[11px] leading-tight whitespace-nowrap ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
