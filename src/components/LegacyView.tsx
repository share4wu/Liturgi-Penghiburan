import { useState } from 'react';
import { LIFE_BIOGRAPHY, MEMORIAL_PROFILE } from '../data/memorialData';
import { SacredDivider } from './SacredDivider';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: string;
}

const MEMORY_GALLERY: GalleryItem[] = [
  {
    id: 'fig-1',
    src: MEMORIAL_PROFILE.chapelBannerUrl,
    alt: 'Meja altar kapel dengan bunga lili putih, ranting zaitun, dan lilin doa',
    caption: 'Fig. 1 — Lilin pengharapan dan lili putih di ruang doa Kapel Kasih Karunia.',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'fig-2',
    src: MEMORIAL_PROFILE.gardenMemoryUrl,
    alt: 'Teras taman anggrek putih yang dirawat almarhumah di pagi hari',
    caption: 'Fig. 2 — Beranda kebun anggrek bulan tempat Oma Magdalena menikmati teduh pagi.',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'fig-3',
    src: MEMORIAL_PROFILE.scriptureMemoryUrl,
    alt: 'Alkitab kulit tua di atas kain linen bersama kacamata baca kuningan dan ranting zaitun',
    caption: 'Fig. 3 — Alkitab harian yang setia mendampingi doa fajar beliau selama puluhan tahun.',
    aspect: 'aspect-[4/3]',
  },
];

export function LegacyView() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <div className="px-5 sm:px-8 pb-24 md:pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Biography Section */}
        <article className="max-w-[720px] mx-auto liturgy-card-surface rounded-2xl p-6 sm:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
            Riwayat Hidup & Kesaksian Iman
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] font-semibold leading-[1.28] text-[#2D3748] mt-1.5 text-balance">
            Peziarahan Kasih Delapan Puluh Empat Tahun
          </h2>

          <div className="mt-6 space-y-5 text-[17px] leading-[1.8] tracking-[0.01em] text-[#2D3748]">
            <p className="first-letter:text-[52px] first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-[#755723]">
              {LIFE_BIOGRAPHY.leadParagraph}
            </p>
            <p>{LIFE_BIOGRAPHY.secondParagraph}</p>
            <p>{LIFE_BIOGRAPHY.thirdParagraph}</p>
          </div>
        </article>

        <SacredDivider motif="olive" className="my-12 max-w-[720px] mx-auto" />

        {/* Curated Editorial Photo Gallery */}
        <section aria-labelledby="gallery-heading" className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
              Galeri Kenangan
            </p>
            <h3
              id="gallery-heading"
              className="font-serif text-[24px] sm:text-[28px] font-semibold text-[#2D3748] mt-1"
            >
              Jejak Ketekunan & Keteduhan
            </h3>
          </div>

          <div className="space-y-6">
            {/* Lead 16:9 Sanctuary Visual */}
            <figure className="liturgy-card-surface rounded-2xl p-4 sm:p-5">
              <div className={`overflow-hidden rounded-xl bg-[#F5F3EF] ${MEMORY_GALLERY[0].aspect}`}>
                {!failedImages[MEMORY_GALLERY[0].id] ? (
                  <img
                    src={MEMORY_GALLERY[0].src}
                    alt={MEMORY_GALLERY[0].alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [MEMORY_GALLERY[0].id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6 text-center text-sm text-[#596579]">
                    {MEMORY_GALLERY[0].alt}
                  </div>
                )}
              </div>
              <figcaption className="mt-3 font-serif italic text-[14px] text-[#596579]">
                {MEMORY_GALLERY[0].caption}
              </figcaption>
            </figure>

            {/* Two-column 4:3 Memory Frames */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEMORY_GALLERY.slice(1).map((item) => (
                <figure key={item.id} className="liturgy-card-surface rounded-2xl p-4">
                  <div className={`overflow-hidden rounded-xl bg-[#F5F3EF] ${item.aspect}`}>
                    {!failedImages[item.id] ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-sm text-[#596579]">
                        {item.alt}
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3 font-serif italic text-[14px] text-[#596579]">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <SacredDivider motif="cross" className="my-12 max-w-[720px] mx-auto" />

        {/* Milestones & Family Lineage Split */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chronological Milestones */}
          <section className="lg:col-span-7 liturgy-card-surface rounded-2xl p-6 sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#755723]">
              Linimasa Kehidupan
            </p>
            <h3 className="font-serif text-[22px] font-semibold text-[#2D3748] mt-1 pb-4 border-b border-[#E8E4DD]">
              Tonggak Sejarah & Pelayanan
            </h3>

            <div className="mt-5 divide-y divide-[#E8E4DD]">
              {LIFE_BIOGRAPHY.milestones.map((m, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
                    <span className="font-semibold text-[#755723] tabular-nums">{m.year}</span>
                    <span aria-hidden="true" className="text-[#D2C5B5]">·</span>
                    <span className="text-[#446554] font-medium">{m.location}</span>
                  </div>
                  <h4 className="font-serif text-[18px] font-medium text-[#2D3748] mt-1">
                    {m.title}
                  </h4>
                  <p className="text-[15px] leading-[1.65] text-[#596579] mt-1">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Family Lineage */}
          <section className="lg:col-span-5 bg-[#F5F3EF] border border-[#E8E4DD] rounded-2xl p-6 sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#446554]">
              Keluarga Besar
            </p>
            <h3 className="font-serif text-[22px] font-semibold text-[#2D3748] mt-1 pb-4 border-b border-[#E8E4DD]">
              Yang Mengasihi
            </h3>

            <div className="mt-5 space-y-5">
              {LIFE_BIOGRAPHY.familyLineage.map((group, gIdx) => (
                <div key={gIdx}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#755723]">
                    {group.role}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {group.names.map((name, nIdx) => (
                      <li key={nIdx} className="text-[15px] leading-[1.6] text-[#2D3748]">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
