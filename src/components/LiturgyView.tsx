import { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Printer, Square } from 'lucide-react';
import {
  HYMNS,
  LITURGY_MOVEMENTS,
  LITURGY_STEPS,
  type HymnData,
  type LiturgyStep,
} from '../data/memorialData';
import { hymnAudio } from '../utils/hymnAudio';
import { HymnBlock } from './HymnBlock';
import { SacredDivider } from './SacredDivider';

export type FontScale = 'normal' | 'large' | 'xlarge';

interface LiturgyViewProps {
  onGoToCondolences: () => void;
}

const FONT_SCALE_MAP: Record<FontScale, { prose: string; hymn: string; scripture: string }> = {
  normal: {
    prose: 'text-[17px] leading-[1.72]',
    hymn: 'text-[17px] sm:text-[18px]',
    scripture: 'text-[18px] leading-[1.7]',
  },
  large: {
    prose: 'text-[19px] leading-[1.76]',
    hymn: 'text-[19px] sm:text-[20px]',
    scripture: 'text-[20px] leading-[1.72]',
  },
  xlarge: {
    prose: 'text-[21px] leading-[1.8]',
    hymn: 'text-[21px] sm:text-[22px]',
    scripture: 'text-[22px] leading-[1.75]',
  },
};

function getRoleChipClasses(variant: LiturgyStep['roleVariant']) {
  if (variant === 'sage') {
    return 'bg-[#EAF0EC] text-[#446554] border border-[#6B8E7B]/25';
  }
  if (variant === 'bronze') {
    return 'bg-[#FAF9F6] text-[#755723] border border-[#E8E4DD]';
  }
  return 'bg-[#FFFFFF] text-[#596579] border border-[#E8E4DD]';
}

export function LiturgyView({ onGoToCondolences }: LiturgyViewProps) {
  const [activeStepId, setActiveStepId] = useState<string>('step-01');
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [expandedReflection, setExpandedReflection] = useState<boolean>(true);
  const [audioState, setAudioState] = useState<{
    hymnId: HymnData['id'] | null;
    isPlaying: boolean;
    progress: number;
  }>({ hymnId: null, isPlaying: false, progress: 0 });

  useEffect(() => {
    return hymnAudio.subscribe(setAudioState);
  }, []);

  const currentStepIndex = LITURGY_STEPS.findIndex((s) => s.id === activeStepId);
  const scales = FONT_SCALE_MAP[fontScale];

  const handleSelectStep = (stepId: string, scroll = false) => {
    setActiveStepId(stepId);
    if (scroll) {
      const el = document.getElementById(stepId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleStepOffset = (delta: number) => {
    const nextIdx = Math.min(LITURGY_STEPS.length - 1, Math.max(0, currentStepIndex + delta));
    const nextStep = LITURGY_STEPS[nextIdx];
    if (nextStep) {
      handleSelectStep(nextStep.id, true);
    }
  };

  return (
    <div className="px-5 sm:px-8 pb-24 md:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Reading Comfort & Print Toolbar */}
        <div className="no-print max-w-[720px] lg:max-w-none mx-auto mb-8 p-4 sm:px-6 bg-[#F5F3EF] border border-[#E8E4DD] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#596579]">
              Ukuran Teks Baca
            </span>
            <div className="inline-flex items-center p-1 bg-[#FFFFFF] border border-[#E8E4DD] rounded-lg">
              {(
                [
                  { id: 'normal', label: 'Normal' },
                  { id: 'large', label: 'Besar' },
                  { id: 'xlarge', label: 'Ekstra' },
                ] as { id: FontScale; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFontScale(opt.id)}
                  className={`min-h-[36px] px-3 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap ${
                    fontScale === opt.id
                      ? 'bg-[#755723] text-white'
                      : 'text-[#596579] hover:text-[#2D3748]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="h-11 px-5 rounded-lg bg-[#755723] text-white hover:bg-[#5d420f] text-[13px] font-semibold tracking-wide inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] focus-visible:ring-offset-2"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh Warta Liturgi PDF</span>
          </button>
        </div>

        {/* Desktop 2-Column Balanced Reading Canvas */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
          {/* Primary Liturgy Reading Column (max 720px) */}
          <div className="w-full max-w-[720px] mx-auto lg:mx-0">
            {LITURGY_MOVEMENTS.map((movement, mIdx) => {
              const steps = LITURGY_STEPS.filter((s) => s.movementId === movement.id);
              return (
                <section key={movement.id} aria-labelledby={`movement-${movement.id}`}>
                  {mIdx > 0 && <SacredDivider motif="olive" className="my-12" />}

                  <header className="mb-6 text-center sm:text-left">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
                      {movement.roman}
                    </p>
                    <h2
                      id={`movement-${movement.id}`}
                      className="font-serif text-[24px] sm:text-[30px] font-semibold leading-[1.3] text-[#2D3748] mt-1 text-balance"
                    >
                      {movement.title}
                    </h2>
                    <p className="text-[15px] text-[#596579] mt-1.5">{movement.subtitle}</p>
                  </header>

                  <div className="space-y-6">
                    {steps.map((step) => {
                      const isActive = activeStepId === step.id;
                      return (
                        <article
                          key={step.id}
                          id={step.id}
                          onClick={() => setActiveStepId(step.id)}
                          className={`rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
                            isActive ? 'liturgy-card-active' : 'liturgy-card-surface hover:border-[#D2C5B5]'
                          }`}
                        >
                          {/* Card Header: Step Number + Role Chip */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E4DD]">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#755723] tabular-nums">
                                {step.stepNumber}. {step.title}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-lg text-[12px] font-semibold tracking-[0.04em] whitespace-nowrap ${getRoleChipClasses(
                                step.roleVariant
                              )}`}
                            >
                              {step.roleChip}
                            </span>
                          </div>

                          {/* Instruction */}
                          {step.instruction && (
                            <p className="mt-4 text-[14px] italic text-[#596579]">
                              {step.instruction}
                            </p>
                          )}

                          {/* Responsive Parts (Leader / Congregation) */}
                          {step.responsiveParts && (
                            <div className="mt-4 space-y-4">
                              {step.responsiveParts.map((part, pIdx) => {
                                const isCongregation = part.speaker === 'J' || part.speaker === 'Semua';
                                return (
                                  <div
                                    key={pIdx}
                                    className={
                                      isCongregation
                                        ? 'bg-[#FAF9F6] border border-[#E8E4DD] rounded-lg p-4 sm:p-5'
                                        : 'py-1'
                                    }
                                  >
                                    <p
                                      className={`text-[12px] font-semibold uppercase tracking-[0.08em] mb-1.5 ${
                                        isCongregation ? 'text-[#446554]' : 'text-[#755723]'
                                      }`}
                                    >
                                      {part.label}
                                    </p>
                                    <p
                                      className={`${scales.prose} tracking-[0.01em] text-[#2D3748] ${
                                        isCongregation ? 'font-semibold' : 'font-normal'
                                      }`}
                                    >
                                      {part.text}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Prayer Text */}
                          {step.prayerText && (
                            <div className="mt-4 space-y-3">
                              {step.prayerText.map((p, idx) => (
                                <p
                                  key={idx}
                                  className={`${scales.prose} text-[#2D3748] tracking-[0.01em]`}
                                >
                                  {p}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Scripture Reading */}
                          {step.scripture && (
                            <div className="mt-5 py-4 px-5 bg-[#FAF9F6] border border-[#E8E4DD] rounded-lg">
                              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8E4DD]">
                                <span className="font-serif text-[17px] font-semibold text-[#755723]">
                                  {step.scripture.reference}
                                </span>
                                <span className="text-[12px] text-[#596579]">
                                  {step.scripture.translation}
                                </span>
                              </div>
                              <div className="mt-4 space-y-3">
                                {step.scripture.verses.map((verse, vIdx) => (
                                  <p
                                    key={vIdx}
                                    className={`font-serif italic ${scales.scripture} text-[#2D3748]`}
                                  >
                                    <span className="not-italic font-sans text-[12px] font-semibold text-[#755723] mr-2 tabular-nums">
                                      {vIdx + 1}
                                    </span>
                                    {verse}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sermon / Reflection Outline */}
                          {step.reflectionNotes && (
                            <div className="mt-5 border border-[#E8E4DD] rounded-lg p-4 sm:p-5 bg-[#FFFFFF]">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#446554]">
                                    Pokok Renungan · {step.reflectionNotes.preacher}
                                  </p>
                                  <h4 className="font-serif text-[19px] font-semibold text-[#2D3748] mt-1">
                                    “{step.reflectionNotes.theme}”
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedReflection((prev) => !prev);
                                  }}
                                  className="no-print min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E8E4DD] text-[#596579] hover:text-[#2D3748] hover:bg-[#FAF9F6] transition-colors"
                                  aria-label={expandedReflection ? 'Tutup pokok renungan' : 'Buka pokok renungan'}
                                >
                                  {expandedReflection ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              </div>

                              {expandedReflection && (
                                <div className="mt-3 pt-3 border-t border-[#E8E4DD] space-y-3">
                                  <p className="text-[15px] leading-[1.65] text-[#596579]">
                                    {step.reflectionNotes.summary}
                                  </p>
                                  <ul className="space-y-2">
                                    {step.reflectionNotes.points.map((pt, ptIdx) => (
                                      <li
                                        key={ptIdx}
                                        className="flex items-baseline gap-2.5 text-[15px] leading-[1.6] text-[#2D3748]"
                                      >
                                        <span className="text-[#755723] font-semibold tabular-nums shrink-0">
                                          0{ptIdx + 1}.
                                        </span>
                                        <span>{pt}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Family Message */}
                          {step.familyMessage && (
                            <div className="mt-4 space-y-3">
                              <p className="text-[13px] font-semibold text-[#446554]">
                                Disampaikan oleh: {step.familyMessage.representative}
                              </p>
                              {step.familyMessage.paragraphs.map((para, idx) => (
                                <p key={idx} className={`${scales.prose} text-[#2D3748]`}>
                                  {para}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Hymn Block */}
                          {step.hymn && (
                            <div onClick={(e) => e.stopPropagation()}>
                              <HymnBlock hymn={step.hymn} fontScaleClass={scales.hymn} />
                            </div>
                          )}

                          {/* Step Navigation Footer for Active Card */}
                          {isActive && (
                            <div className="no-print mt-5 pt-4 border-t border-[#E8E4DD] flex items-center justify-between gap-3">
                              <button
                                type="button"
                                disabled={currentStepIndex === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStepOffset(-1);
                                }}
                                className="min-h-[40px] px-3 rounded-lg text-[13px] font-medium text-[#596579] hover:text-[#2D3748] hover:bg-[#FAF9F6] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1 transition-colors"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Sebelumnya</span>
                              </button>
                              <span className="text-[12px] text-[#596579] tabular-nums">
                                Bagian {currentStepIndex + 1} dari {LITURGY_STEPS.length}
                              </span>
                              {currentStepIndex < LITURGY_STEPS.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStepOffset(1);
                                  }}
                                  className="min-h-[40px] px-3 rounded-lg text-[13px] font-semibold text-[#755723] hover:bg-[#FAF9F6] inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Langkah Berikutnya</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onGoToCondolences();
                                  }}
                                  className="min-h-[40px] px-3 rounded-lg text-[13px] font-semibold text-[#446554] hover:bg-[#EAF0EC] inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Kirim Ucapan</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Sticky Desktop Margin Index Rail */}
          <aside className="no-print hidden lg:block w-72 shrink-0 sticky top-20 space-y-5">
            <div className="liturgy-card-surface rounded-2xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#755723] pb-3 border-b border-[#E8E4DD]">
                Navigasi Tata Ibadah
              </p>
              <nav className="mt-3 space-y-1" aria-label="Daftar Urutan Ibadah">
                {LITURGY_STEPS.map((step) => {
                  const isActive = activeStepId === step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleSelectStep(step.id, true)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors flex items-baseline gap-2.5 ${
                        isActive
                          ? 'bg-[#FAF9F6] text-[#755723] font-semibold border border-[#A38048]/40'
                          : 'text-[#596579] hover:text-[#2D3748] hover:bg-[#FAF9F6]/70'
                      }`}
                    >
                      <span className="text-[11px] font-semibold tabular-nums shrink-0">
                        {step.stepNumber}
                      </span>
                      <span className="truncate">{step.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {audioState.isPlaying && audioState.hymnId && (
              <div className="liturgy-card-surface rounded-2xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#446554]">
                  Sedang Diputar
                </p>
                <p className="font-serif text-[17px] font-medium text-[#2D3748] mt-1">
                  {HYMNS[audioState.hymnId].title}
                </p>
                <p className="text-[12px] text-[#596579] mt-0.5">
                  {HYMNS[audioState.hymnId].code}
                </p>
                <div className="h-1 w-full bg-[#E8E4DD] rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-[#6B8E7B] transition-all duration-300"
                    style={{ width: `${audioState.progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => hymnAudio.stop()}
                  className="mt-3 w-full h-10 rounded-lg border border-[#A38048] text-[#755723] text-[13px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#A38048]/8 transition-colors"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Hentikan Musik</span>
                </button>
              </div>
            )}

            <div className="bg-[#F5F3EF] border border-[#E8E4DD] rounded-2xl p-5">
              <h3 className="font-serif text-[18px] font-semibold text-[#2D3748]">
                Ucapan & Doa Jemaat
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#596579] mt-1.5">
                Tinggalkan pesan penghiburan atau nyalakan lilin kenangan bagi keluarga yang berduka.
              </p>
              <button
                type="button"
                onClick={onGoToCondolences}
                className="mt-4 w-full h-11 rounded-lg bg-[#755723] text-white text-[13px] font-semibold tracking-wide hover:bg-[#5d420f] transition-colors"
              >
                Kirim Ucapan Belasungkawa
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
