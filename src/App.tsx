import { useState } from 'react';
import { CondolenceView } from './components/CondolenceView';
import { HeroBanner } from './components/HeroBanner';
import { HymnalView } from './components/HymnalView';
import { LegacyView } from './components/LegacyView';
import { LiturgyView } from './components/LiturgyView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SacredDivider } from './components/SacredDivider';
import { ScheduleModal } from './components/ScheduleModal';
import { TopBar, type AppTab } from './components/TopBar';
import { MEMORIAL_PROFILE } from './data/memorialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('liturgi');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleSelectTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D3748]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      <main className="flex-1">
        <HeroBanner onOpenSchedule={() => setIsScheduleOpen(true)} />

        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <SacredDivider motif="olive" className="my-6 sm:my-8" />
        </div>

        {activeTab === 'liturgi' && (
          <LiturgyView onGoToCondolences={() => handleSelectTab('ucapan')} />
        )}
        {activeTab === 'riwayat' && <LegacyView />}
        {activeTab === 'kidung' && <HymnalView />}
        {activeTab === 'ucapan' && <CondolenceView />}
      </main>

      <footer className="no-print bg-[#F5F3EF] border-t border-[#E8E4DD] py-10 px-5 sm:px-8 mb-[58px] md:mb-0">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="font-serif text-[19px] font-semibold text-[#2D3748]">
            {MEMORIAL_PROFILE.fullName}
          </p>
          <p className="text-[14px] text-[#596579]">
            {MEMORIAL_PROFILE.serviceSummary.serviceTitle} · {MEMORIAL_PROFILE.serviceSummary.venueLabel}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-[#755723]">
            <button
              type="button"
              onClick={() => handleSelectTab('liturgi')}
              className="hover:underline underline-offset-4"
            >
              Tata Ibadah
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('riwayat')}
              className="hover:underline underline-offset-4"
            >
              Riwayat Hidup
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('kidung')}
              className="hover:underline underline-offset-4"
            >
              Nyanyian & Bacaan
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('ucapan')}
              className="hover:underline underline-offset-4"
            >
              Ucapan & Doa
            </button>
            <button
              type="button"
              onClick={() => setIsScheduleOpen(true)}
              className="hover:underline underline-offset-4"
            >
              Info Pemakaman
            </button>
          </div>
          <p className="pt-3 text-[12px] text-[#596579]">
            Serene Grace Memorial · Warta Ibadah Digital Keluarga Besar Kusuma
          </p>
        </div>
      </footer>

      <MobileBottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
      <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
    </div>
  );
}
