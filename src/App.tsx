import { Component, useCallback, useEffect, useState, type ReactNode } from 'react';
import { CondolenceView } from './components/CondolenceView';
import { HeroBanner } from './components/HeroBanner';
import { HymnalView } from './components/HymnalView';
import { LegacyView } from './components/LegacyView';
import { LiturgyView } from './components/LiturgyView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SacredDivider } from './components/SacredDivider';
import { ScheduleModal } from './components/ScheduleModal';
import { TAB_HASH_MAP, TopBar, type AppTab } from './components/TopBar';
import { MEMORIAL_PROFILE } from './data/memorialData';

interface ErrorBoundaryState {
  hasError: boolean;
}

class SectionErrorBoundary extends Component<{ children: ReactNode; onReset: () => void }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-[720px] mx-auto px-5 py-12 text-center">
          <div className="liturgy-card-surface rounded-2xl p-8">
            <h2 className="font-serif text-[22px] font-semibold text-[#2D3748]">
              Terjadi kendala saat menampilkan halaman
            </h2>
            <p className="text-[15px] text-[#596579] mt-2">
              Silakan muat ulang bagian Tata Ibadah untuk melanjutkan.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onReset();
              }}
              className="mt-5 h-11 px-5 rounded-lg bg-[#755723] text-white text-[14px] font-semibold hover:bg-[#5d420f] transition-colors"
            >
              Kembali ke Tata Ibadah
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function parseTabFromLocation(): { tab: AppTab; openSchedule: boolean } {
  if (typeof window === 'undefined') {
    return { tab: 'liturgi', openSchedule: false };
  }

  const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const searchTab = new URLSearchParams(window.location.search).get('tab')?.toLowerCase() || '';
  const token = rawHash || searchTab;

  if (token === 'jadwal' || token === 'info-jadwal' || token === 'info-pemakaman') {
    return { tab: 'liturgi', openSchedule: true };
  }
  if (token === 'riwayat' || token === 'riwayat-hidup') {
    return { tab: 'riwayat', openSchedule: false };
  }
  if (token === 'kidung' || token === 'nyanyian-bacaan' || token === 'nyanyian') {
    return { tab: 'kidung', openSchedule: false };
  }
  if (token === 'ucapan' || token === 'ucapan-doa' || token === 'doa') {
    return { tab: 'ucapan', openSchedule: false };
  }
  return { tab: 'liturgi', openSchedule: false };
}

export default function App() {
  const initialState = parseTabFromLocation();
  const [activeTab, setActiveTab] = useState<AppTab>(initialState.tab);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(initialState.openSchedule);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseTabFromLocation();
      setActiveTab(parsed.tab);
      setIsScheduleOpen(parsed.openSchedule);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = useCallback((tab: AppTab) => {
    setActiveTab(tab);
    setIsScheduleOpen(false);
    const targetHash = TAB_HASH_MAP[tab];
    if (window.location.hash !== targetHash) {
      try {
        window.history.replaceState(null, '', targetHash);
      } catch {
        window.location.hash = targetHash;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenSchedule = useCallback(() => {
    setIsScheduleOpen(true);
  }, []);

  const handleCloseSchedule = useCallback(() => {
    setIsScheduleOpen(false);
    if (window.location.hash.toLowerCase().includes('jadwal')) {
      const fallbackHash = TAB_HASH_MAP[activeTab];
      try {
        window.history.replaceState(null, '', fallbackHash);
      } catch {
        window.location.hash = fallbackHash;
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D3748]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSchedule={handleOpenSchedule}
      />

      <main className="flex-1">
        <HeroBanner onOpenSchedule={handleOpenSchedule} compact={activeTab !== 'liturgi'} />

        {activeTab === 'liturgi' ? (
          <div className="max-w-[720px] mx-auto px-5 sm:px-8">
            <SacredDivider motif="olive" className="my-6 sm:my-8" />
          </div>
        ) : (
          <div className="h-6 sm:h-8" aria-hidden="true" />
        )}

        <SectionErrorBoundary onReset={() => handleSelectTab('liturgi')}>
          {activeTab === 'liturgi' && (
            <LiturgyView onGoToCondolences={() => handleSelectTab('ucapan')} />
          )}
          {activeTab === 'riwayat' && <LegacyView />}
          {activeTab === 'kidung' && <HymnalView />}
          {activeTab === 'ucapan' && <CondolenceView />}
        </SectionErrorBoundary>
      </main>

      <footer className="no-print bg-[#F5F3EF] border-t border-[#E8E4DD] py-10 px-5 sm:px-8 mb-[60px] md:mb-0">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="font-serif text-[19px] font-semibold text-[#2D3748]">
            {MEMORIAL_PROFILE.fullName}
          </p>
          <p className="text-[14px] text-[#596579]">
            {MEMORIAL_PROFILE.serviceSummary.serviceTitle} · {MEMORIAL_PROFILE.serviceSummary.venueLabel}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-[#755723]">
            <a
              href={TAB_HASH_MAP.liturgi}
              onClick={(e) => {
                e.preventDefault();
                handleSelectTab('liturgi');
              }}
              className="hover:underline underline-offset-4 py-1"
            >
              Tata Ibadah
            </a>
            <a
              href={TAB_HASH_MAP.riwayat}
              onClick={(e) => {
                e.preventDefault();
                handleSelectTab('riwayat');
              }}
              className="hover:underline underline-offset-4 py-1"
            >
              Riwayat Hidup
            </a>
            <a
              href={TAB_HASH_MAP.kidung}
              onClick={(e) => {
                e.preventDefault();
                handleSelectTab('kidung');
              }}
              className="hover:underline underline-offset-4 py-1"
            >
              Nyanyian & Bacaan
            </a>
            <a
              href={TAB_HASH_MAP.ucapan}
              onClick={(e) => {
                e.preventDefault();
                handleSelectTab('ucapan');
              }}
              className="hover:underline underline-offset-4 py-1"
            >
              Ucapan & Doa
            </a>
            <button
              type="button"
              onClick={handleOpenSchedule}
              className="hover:underline underline-offset-4 py-1 cursor-pointer"
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
      <ScheduleModal isOpen={isScheduleOpen} onClose={handleCloseSchedule} />
    </div>
  );
}
