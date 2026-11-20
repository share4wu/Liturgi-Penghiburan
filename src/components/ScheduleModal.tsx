import { useState } from 'react';
import { Calendar, Check, Clock, Copy, MapPin, X } from 'lucide-react';
import { SERVICE_SCHEDULES } from '../data/memorialData';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyAddress = async (id: string, address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2200);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D3748]/30 backdrop-blur-[8px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-surface-elevated w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E8E4DD]">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#755723]">
              Informasi Rangkaian Ibadah
            </p>
            <h2
              id="schedule-modal-title"
              className="font-serif text-[24px] sm:text-[28px] font-semibold text-[#2D3748] mt-1"
            >
              Jadwal Penghiburan & Pemakaman
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup informasi jadwal"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-[#E8E4DD] text-[#596579] hover:text-[#2D3748] hover:bg-[#FAF9F6] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {SERVICE_SCHEDULES.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DD] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-[19px] font-semibold text-[#2D3748]">
                    {item.title}
                  </h3>
                  <span className="text-[13px] font-medium text-[#446554]">
                    Dilayani oleh {item.officiant}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px] text-[#2D3748]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#755723]" />
                    <span>{item.dayDate}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 tabular-nums">
                    <Clock className="w-4 h-4 text-[#755723]" />
                    <span>{item.time}</span>
                  </span>
                </div>

                <div className="pt-1 text-[14px] text-[#596579]">
                  <p className="font-semibold text-[#2D3748] inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#446554] shrink-0" />
                    <span>{item.venue}</span>
                  </p>
                  <p className="mt-1 pl-5">{item.address}</p>
                  <p className="mt-2 pl-5 text-[13px] italic">{item.notes}</p>
                </div>

                <div className="pt-2 pl-5">
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(item.id, `${item.venue}, ${item.address}`)}
                    className="min-h-[40px] px-3.5 rounded-lg border border-[#A38048] text-[#755723] text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-[#A38048]/8 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-[#446554]" />
                        <span>Alamat Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Alamat Lokasi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-[#E8E4DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[13px] text-[#596579]">
            Narahubung Keluarga: Bpk. Yohanes Adi Kusuma (+62 812-8000-4192)
          </p>
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-lg bg-[#755723] text-white text-[14px] font-semibold hover:bg-[#5d420f] transition-colors whitespace-nowrap"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
