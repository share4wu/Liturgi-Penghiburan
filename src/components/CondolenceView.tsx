import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Check, Flame } from 'lucide-react';
import { INITIAL_CONDOLENCES, type CondolenceEntry } from '../data/memorialData';
import { SacredDivider } from './SacredDivider';

const STORAGE_ENTRIES_KEY = 'serene_grace_condolences_v1';
const STORAGE_CANDLES_KEY = 'serene_grace_candles_v1';
const STORAGE_CANDLE_LIT_KEY = 'serene_grace_candle_lit_v1';

type CategoryFilter = 'Semua' | CondolenceEntry['category'];

export function CondolenceView() {
  const [entries, setEntries] = useState<CondolenceEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ENTRIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CondolenceEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial entries
    }
    return INITIAL_CONDOLENCES;
  });

  const [candleCount, setCandleCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CANDLES_KEY);
      return saved ? Number(saved) || 48 : 48;
    } catch {
      return 48;
    }
  });

  const [hasLitCandle, setHasLitCandle] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_CANDLE_LIT_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [filter, setFilter] = useState<CategoryFilter>('Semua');
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [category, setCategory] = useState<CondolenceEntry['category']>('Jemaat & Pelayan');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ENTRIES_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage quota issues
    }
  }, [entries]);

  const handleLightCandle = () => {
    if (hasLitCandle) return;
    const nextCount = candleCount + 1;
    setCandleCount(nextCount);
    setHasLitCandle(true);
    try {
      localStorage.setItem(STORAGE_CANDLES_KEY, String(nextCount));
      localStorage.setItem(STORAGE_CANDLE_LIT_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setFormError('Mohon isi nama Anda terlebih dahulu.');
      return;
    }
    if (!trimmedMsg) {
      setFormError('Mohon tuliskan ucapan penghiburan atau doa bagi keluarga.');
      return;
    }

    const newEntry: CondolenceEntry = {
      id: `cond-${Date.now()}`,
      name: trimmedName,
      relation: relation.trim() || 'Simpatisan & Sahabat',
      category,
      message: trimmedMsg,
      createdAt: 'Baru saja',
    };

    setEntries((prev) => [newEntry, ...prev]);
    setName('');
    setRelation('');
    setMessage('');
    setFormError(null);
    setSubmittedNotice(true);
    window.setTimeout(() => setSubmittedNotice(false), 3500);
  };

  const filteredEntries = useMemo(() => {
    if (filter === 'Semua') return entries;
    return entries.filter((entry) => entry.category === filter);
  }, [entries, filter]);

  return (
    <div className="px-5 sm:px-8 pb-24 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <header className="max-w-[720px] mx-auto text-center mb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
            Tanda Kasih & Penghiburan
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] font-semibold text-[#2D3748] mt-1 text-balance">
            Ucapan Belasungkawa & Doa
          </h2>
          <p className="text-[15px] text-[#596579] mt-2">
            Setiap doa dan kenangan hangat yang Anda tuliskan menjadi kekuatan bagi keluarga besar Kusuma.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Candle Tribute + Submission Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Candle of Remembrance */}
            <div className="bg-[#F5F3EF] border border-[#E8E4DD] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#C49F60] mx-auto flex items-center justify-center text-[#755723]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-[20px] font-semibold text-[#2D3748] mt-3">
                Lilin Kenangan
              </h3>
              <p className="text-[14px] text-[#596579] mt-1">
                <span className="font-semibold text-[#2D3748] tabular-nums">{candleCount}</span> lilin doa telah dinyalakan untuk mengenang Ibu Magdalena.
              </p>
              <button
                type="button"
                onClick={handleLightCandle}
                disabled={hasLitCandle}
                className={`mt-4 w-full h-11 rounded-lg text-[13px] font-semibold tracking-wide inline-flex items-center justify-center gap-2 transition-colors ${
                  hasLitCandle
                    ? 'bg-[#EAF0EC] text-[#446554] border border-[#6B8E7B]/30 cursor-default'
                    : 'bg-transparent border border-[#A38048] text-[#755723] hover:bg-[#A38048]/8'
                }`}
              >
                {hasLitCandle ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Lilin Doa Anda Telah Menyala</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4" />
                    <span>Nyalakan Lilin Kenangan</span>
                  </>
                )}
              </button>
            </div>

            {/* Condolence Form */}
            <form
              onSubmit={handleSubmit}
              className="liturgy-card-surface rounded-2xl p-6 space-y-4"
              noValidate
            >
              <div className="pb-3 border-b border-[#E8E4DD]">
                <h3 className="font-serif text-[20px] font-semibold text-[#2D3748]">
                  Tuliskan Ucapan & Doa
                </h3>
              </div>

              <div>
                <label
                  htmlFor="condolence-name"
                  className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#596579] mb-1.5"
                >
                  Nama Pengirim
                </label>
                <input
                  id="condolence-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Kel. Bpk. Andreas Santoso"
                  className="memorial-input w-full h-11 px-3.5 text-[15px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="condolence-relation"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#596579] mb-1.5"
                  >
                    Asal Jemaat / Hubungan
                  </label>
                  <input
                    id="condolence-relation"
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="Contoh: GKI / Rekan"
                    className="memorial-input w-full h-11 px-3.5 text-[15px]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="condolence-category"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#596579] mb-1.5"
                  >
                    Kelompok
                  </label>
                  <select
                    id="condolence-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CondolenceEntry['category'])}
                    className="memorial-input w-full h-11 px-3 text-[14px]"
                  >
                    <option value="Jemaat & Pelayan">Jemaat & Pelayan</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat & Rekan">Sahabat & Rekan</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="condolence-message"
                  className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#596579] mb-1.5"
                >
                  Pesan Penghiburan & Doa
                </label>
                <textarea
                  id="condolence-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan belasungkawa, kenangan singkat, atau doa penghiburan bagi keluarga..."
                  className="memorial-input w-full p-3.5 text-[15px] leading-[1.6]"
                />
              </div>

              {formError && (
                <p className="text-[13px] font-medium text-[#ba1a1a]" role="alert">
                  {formError}
                </p>
              )}

              {submittedNotice && (
                <p className="text-[13px] font-medium text-[#446554]" role="status">
                  Terima kasih. Ucapan dan doa Anda telah ditambahkan ke dinding kenangan.
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#755723] text-white text-[14px] font-semibold tracking-wide hover:bg-[#5d420f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] focus-visible:ring-offset-2"
              >
                Kirim Ucapan / Belasungkawa
              </button>
            </form>
          </div>

          {/* Right Column: Prayer & Condolence Wall */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-[#596579] tabular-nums">
                {filteredEntries.length} Ucapan Tersampaikan
              </p>

              <div className="inline-flex flex-wrap items-center p-1 bg-[#FFFFFF] border border-[#E8E4DD] rounded-lg">
                {(['Semua', 'Keluarga', 'Jemaat & Pelayan', 'Sahabat & Rekan'] as CategoryFilter[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFilter(tab)}
                      className={`min-h-[36px] px-3 text-[12px] sm:text-[13px] font-medium rounded-md transition-colors whitespace-nowrap ${
                        filter === tab
                          ? 'bg-[#755723] text-white'
                          : 'text-[#596579] hover:text-[#2D3748]'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <article key={entry.id} className="liturgy-card-surface rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-[#E8E4DD]">
                    <div>
                      <h4 className="font-serif text-[19px] font-semibold text-[#2D3748]">
                        {entry.name}
                      </h4>
                      <p className="text-[13px] text-[#596579] mt-0.5">
                        {entry.relation} <span aria-hidden="true">·</span> {entry.category}
                      </p>
                    </div>
                    <span className="text-[12px] text-[#596579]">{entry.createdAt}</span>
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.7] text-[#2D3748]">
                    {entry.message}
                  </p>
                </article>
              ))}
            </div>

            <SacredDivider motif="olive" className="pt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
