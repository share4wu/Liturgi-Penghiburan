import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { MEMORIAL_PROFILE } from '../data/memorialData';
import { SacredDivider } from './SacredDivider';

interface HeroBannerProps {
  onOpenSchedule: () => void;
  compact?: boolean;
}

export function HeroBanner({ onOpenSchedule, compact = false }: HeroBannerProps) {
  const [imgError, setImgError] = useState(false);

  if (compact) {
    return (
      <section className="pt-6 pb-2 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8E4DD]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-16 shrink-0 p-1 bg-white border border-[#C49F60] cameo-arch">
              <div className="w-full h-full overflow-hidden cameo-arch bg-[#F5F3EF] flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={MEMORIAL_PROFILE.portraitUrl}
                    alt={`Potret kenangan ${MEMORIAL_PROFILE.fullName}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="font-serif text-sm text-[#755723]">MK</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
                {MEMORIAL_PROFILE.honorific}
              </p>
              <h1 className="font-serif text-[20px] sm:text-[24px] font-semibold leading-tight text-[#2D3748]">
                {MEMORIAL_PROFILE.fullName}
              </h1>
              <p className="text-[13px] text-[#596579] mt-0.5 tabular-nums">
                {MEMORIAL_PROFILE.birthDate} · {MEMORIAL_PROFILE.restingDate}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSchedule}
            className="self-start sm:self-center inline-flex items-center gap-2 text-[13px] font-medium text-[#446554] hover:text-[#2D3748] underline decoration-[#6B8E7B]/40 underline-offset-4 transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{MEMORIAL_PROFILE.serviceSummary.venueLabel}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 sm:pt-12 pb-6 px-5 sm:px-8">
      <div className="max-w-[720px] mx-auto text-center">
        <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#755723] mb-6">
          {MEMORIAL_PROFILE.honorific}
        </p>

        {/* Arched Cameo Portrait Frame */}
        <div className="mx-auto w-48 sm:w-56 mb-7">
          <div className="p-2 bg-white border border-[#C49F60] cameo-arch shadow-[0_8px_24px_-4px_rgba(163,128,72,0.10)]">
            <div className="overflow-hidden cameo-arch aspect-[3/4] bg-[#F5F3EF] flex items-center justify-center">
              {!imgError ? (
                <img
                  src={MEMORIAL_PROFILE.portraitUrl}
                  alt={`Potret kenangan ${MEMORIAL_PROFILE.fullName}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-serif text-3xl text-[#755723]">MK</span>
                  <span className="text-xs text-[#596579] mt-2">Dalam Kenangan Kasih</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h1 className="font-serif text-[30px] sm:text-[42px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#2D3748] text-balance">
          {MEMORIAL_PROFILE.fullName}
        </h1>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[15px] text-[#596579]">
          <span className="tabular-nums">{MEMORIAL_PROFILE.birthDate}</span>
          <span aria-hidden="true" className="text-[#A38048]">·</span>
          <span className="tabular-nums">{MEMORIAL_PROFILE.restingDate}</span>
          <span aria-hidden="true" className="text-[#A38048]">·</span>
          <span>Usia {MEMORIAL_PROFILE.ageAtPassing}</span>
        </div>

        <SacredDivider motif="cross" className="my-7 max-w-xs mx-auto" />

        {/* Anchoring Scripture */}
        <blockquote className="max-w-xl mx-auto">
          <p className="font-serif italic text-[18px] sm:text-[20px] leading-[1.65] tracking-[0.01em] text-[#2D3748]">
            “{MEMORIAL_PROFILE.anchorVerse.text}”
          </p>
          <footer className="mt-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#755723]">
            {MEMORIAL_PROFILE.anchorVerse.reference}
          </footer>
        </blockquote>

        {/* Service Details Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#E8E4DD] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[14px] text-[#596579]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#755723] shrink-0" />
            <span>
              {MEMORIAL_PROFILE.serviceSummary.dateLabel} · {MEMORIAL_PROFILE.serviceSummary.timeLabel}
            </span>
          </div>
          <span className="hidden sm:inline text-[#D2C5B5]" aria-hidden="true">|</span>
          <button
            type="button"
            onClick={onOpenSchedule}
            className="flex items-center gap-2 text-[#446554] hover:text-[#2D3748] font-medium underline decoration-[#6B8E7B]/40 underline-offset-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] rounded px-1"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{MEMORIAL_PROFILE.serviceSummary.venueLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
