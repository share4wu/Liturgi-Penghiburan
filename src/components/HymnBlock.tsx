import { useEffect, useState } from 'react';
import { Square, Volume2 } from 'lucide-react';
import type { HymnData } from '../data/memorialData';
import { hymnAudio } from '../utils/hymnAudio';

interface HymnBlockProps {
  hymn: HymnData;
  fontScaleClass?: string;
}

export function HymnBlock({ hymn, fontScaleClass = 'text-[17px] sm:text-[18px]' }: HymnBlockProps) {
  const [audioState, setAudioState] = useState<{
    hymnId: HymnData['id'] | null;
    isPlaying: boolean;
    progress: number;
  }>({ hymnId: null, isPlaying: false, progress: 0 });

  useEffect(() => {
    return hymnAudio.subscribe(setAudioState);
  }, []);

  const isThisPlaying = audioState.isPlaying && audioState.hymnId === hymn.id;

  return (
    <div className="mt-4 bg-[#FAF9F6] border border-[#E8E4DD] rounded-lg p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-[#E8E4DD]">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#755723]">
            {hymn.code}
          </p>
          <h4 className="font-serif text-[20px] font-medium leading-[1.35] text-[#2D3748] mt-1">
            {hymn.title}
          </h4>
          <p className="text-[13px] text-[#596579] mt-1">
            {hymn.composer} · {hymn.keySignature}
          </p>
        </div>

        <button
          type="button"
          onClick={() => hymnAudio.toggle(hymn.id)}
          className={`no-print min-h-[44px] px-4 py-2 rounded-lg text-[13px] font-semibold tracking-wide inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A38048] ${
            isThisPlaying
              ? 'bg-[#755723] text-white hover:bg-[#5d420f]'
              : 'bg-transparent border border-[#A38048] text-[#755723] hover:bg-[#A38048]/8'
          }`}
        >
          {isThisPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Hentikan Pengiring</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Putar Musik Pengiring</span>
            </>
          )}
        </button>
      </div>

      {isThisPlaying && (
        <div className="no-print mt-3">
          <div className="flex items-center justify-between text-[12px] text-[#446554] font-medium mb-1.5">
            <span>Musik pengiring organ sedang diputar</span>
            <span className="tabular-nums">{audioState.progress}%</span>
          </div>
          <div className="h-1 w-full bg-[#E8E4DD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B8E7B] transition-all duration-300"
              style={{ width: `${audioState.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-5 space-y-5">
        {hymn.stanzas.map((stanza, idx) => (
          <div
            key={`${hymn.id}-stanza-${idx}`}
            className={stanza.isRefrain ? 'pl-4 sm:pl-6 py-2 bg-[#FFFFFF]/70 rounded border border-[#E8E4DD]/80' : ''}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#755723] shrink-0 tabular-nums">
                {stanza.isRefrain ? 'Refr.' : `${stanza.number}.`}
              </span>
              <div className={`${fontScaleClass} leading-[1.8] tracking-[0.015em] text-[#2D3748] space-y-0.5`}>
                {stanza.lines.map((line, lineIdx) => (
                  <p key={lineIdx}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
