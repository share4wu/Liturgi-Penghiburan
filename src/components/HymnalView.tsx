import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { HYMNS, LITURGY_STEPS } from '../data/memorialData';
import { HymnBlock } from './HymnBlock';
import { SacredDivider } from './SacredDivider';

type CompanionFilter = 'semua' | 'nyanyian' | 'bacaan';

export function HymnalView() {
  const [filter, setFilter] = useState<CompanionFilter>('semua');
  const [query, setQuery] = useState('');

  const hymnList = useMemo(() => Object.values(HYMNS), []);
  const scriptureList = useMemo(
    () =>
      LITURGY_STEPS.filter((s) => s.scripture).map((s) => ({
        stepNumber: s.stepNumber,
        stepTitle: s.title,
        ...s.scripture!,
      })),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredHymns = useMemo(() => {
    if (filter === 'bacaan') return [];
    if (!normalizedQuery) return hymnList;
    return hymnList.filter(
      (h) =>
        h.title.toLowerCase().includes(normalizedQuery) ||
        h.code.toLowerCase().includes(normalizedQuery) ||
        h.stanzas.some((st) => st.lines.some((l) => l.toLowerCase().includes(normalizedQuery)))
    );
  }, [filter, hymnList, normalizedQuery]);

  const filteredScriptures = useMemo(() => {
    if (filter === 'nyanyian') return [];
    if (!normalizedQuery) return scriptureList;
    return scriptureList.filter(
      (sc) =>
        sc.reference.toLowerCase().includes(normalizedQuery) ||
        sc.stepTitle.toLowerCase().includes(normalizedQuery) ||
        sc.verses.some((v) => v.toLowerCase().includes(normalizedQuery))
    );
  }, [filter, normalizedQuery, scriptureList]);

  return (
    <div className="px-5 sm:px-8 pb-24 md:pb-16">
      <div className="max-w-[720px] mx-auto">
        <header className="text-center mb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
            Pendamping Pujian & Sabda
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] font-semibold text-[#2D3748] mt-1 text-balance">
            Nyanyian Jemaat & Bacaan Alkitab
          </h2>
          <p className="text-[15px] text-[#596579] mt-2">
            Akses cepat seluruh syair kidung beserta musik pengiring organ dan nas pembacaan ibadah.
          </p>
        </header>

        {/* Filter & Search Bar */}
        <div className="liturgy-card-surface rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center p-1 bg-[#FAF9F6] border border-[#E8E4DD] rounded-lg self-start">
              {(
                [
                  { id: 'semua', label: 'Semua' },
                  { id: 'nyanyian', label: 'Nyanyian Jemaat' },
                  { id: 'bacaan', label: 'Bacaan Alkitab' },
                ] as { id: CompanionFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`min-h-[38px] px-3.5 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap ${
                    filter === tab.id
                      ? 'bg-[#755723] text-white'
                      : 'text-[#596579] hover:text-[#2D3748]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:max-w-[240px]">
              <Search className="w-4 h-4 text-[#596579] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul atau ayat..."
                aria-label="Cari nyanyian atau bacaan Alkitab"
                className="memorial-input w-full h-10 pl-9 pr-3 text-[14px]"
              />
            </div>
          </div>
        </div>

        {/* Hymns Section */}
        {filteredHymns.length > 0 && (
          <section aria-labelledby="hymns-list-heading" className="space-y-6">
            <h3
              id="hymns-list-heading"
              className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]"
            >
              Nyanyian Jemaat ({filteredHymns.length})
            </h3>
            {filteredHymns.map((hymn) => (
              <div key={hymn.id} className="liturgy-card-surface rounded-2xl p-4 sm:p-6">
                <HymnBlock hymn={hymn} />
              </div>
            ))}
          </section>
        )}

        {filteredHymns.length > 0 && filteredScriptures.length > 0 && (
          <SacredDivider motif="olive" className="my-10" />
        )}

        {/* Scriptures Section */}
        {filteredScriptures.length > 0 && (
          <section aria-labelledby="scriptures-list-heading" className="space-y-6">
            <h3
              id="scriptures-list-heading"
              className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#446554]"
            >
              Bacaan Alkitab ({filteredScriptures.length})
            </h3>
            {filteredScriptures.map((sc) => (
              <article key={sc.reference} className="liturgy-card-surface rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E8E4DD]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#755723]">
                      Bagian {sc.stepNumber} · {sc.stepTitle}
                    </p>
                    <h4 className="font-serif text-[21px] font-semibold text-[#2D3748] mt-1">
                      {sc.reference}
                    </h4>
                  </div>
                  <span className="text-[13px] text-[#596579]">{sc.translation}</span>
                </div>

                <div className="mt-4 space-y-3">
                  {sc.verses.map((verse, idx) => (
                    <p
                      key={idx}
                      className="font-serif italic text-[18px] leading-[1.7] text-[#2D3748]"
                    >
                      <span className="not-italic font-sans text-[12px] font-semibold text-[#755723] mr-2 tabular-nums">
                        {idx + 1}
                      </span>
                      {verse}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {filteredHymns.length === 0 && filteredScriptures.length === 0 && (
          <div className="liturgy-card-surface rounded-2xl p-8 text-center">
            <p className="font-serif text-[19px] text-[#2D3748]">
              Tidak ada nyanyian atau bacaan yang cocok
            </p>
            <p className="text-[14px] text-[#596579] mt-1">
              Coba kata kunci lain seperti “Yesus”, “Mazmur”, atau “KJ 453”.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('semua');
                setQuery('');
              }}
              className="mt-4 h-10 px-4 rounded-lg border border-[#A38048] text-[#755723] text-[13px] font-semibold hover:bg-[#A38048]/8 transition-colors"
            >
              Tampilkan Semua
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
