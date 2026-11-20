export type SpeakerRole = 'Liturgos' | 'Pemimpin' | 'Jemaat' | 'Paduan Suara' | 'Pelayan Firman' | 'Keluarga';

export interface ResponsivePart {
  speaker: 'P' | 'J' | 'K' | 'Semua';
  label: string;
  text: string;
}

export interface HymnStanza {
  number: number;
  lines: string[];
  isRefrain?: boolean;
}

export interface HymnData {
  id: 'kj453' | 'nkb128' | 'kj416';
  code: string;
  title: string;
  composer: string;
  keySignature: string;
  stanzas: HymnStanza[];
}

export interface LiturgyStep {
  id: string;
  stepNumber: string;
  movementId: 'pembukaan' | 'firman' | 'penutup';
  title: string;
  roleChip: SpeakerRole;
  roleVariant: 'sage' | 'bronze' | 'neutral';
  instruction?: string;
  responsiveParts?: ResponsivePart[];
  scripture?: {
    reference: string;
    translation: string;
    verses: string[];
  };
  hymn?: HymnData;
  reflectionNotes?: {
    preacher: string;
    theme: string;
    summary: string;
    points: string[];
  };
  prayerText?: string[];
  familyMessage?: {
    representative: string;
    paragraphs: string[];
  };
}

export interface LiturgyMovement {
  id: 'pembukaan' | 'firman' | 'penutup';
  roman: string;
  title: string;
  subtitle: string;
}

export interface LifeMilestone {
  year: string;
  location: string;
  title: string;
  description: string;
}

export interface CondolenceEntry {
  id: string;
  name: string;
  relation: string;
  category: 'Keluarga' | 'Jemaat & Pelayan' | 'Sahabat & Rekan';
  message: string;
  createdAt: string;
}

export interface ServiceScheduleItem {
  id: string;
  title: string;
  dayDate: string;
  time: string;
  venue: string;
  address: string;
  officiant: string;
  notes: string;
}

export const MEMORIAL_PROFILE = {
  honorific: 'Mengenang Dengan Kasih & Syukur',
  fullName: 'Ibu Maria Magdalena Kusuma',
  baptismalName: 'Oma Magdalena',
  birthDate: '14 April 1942',
  birthPlace: 'Salatiga, Jawa Tengah',
  restingDate: '17 November 2026',
  ageAtPassing: '84 Tahun',
  portraitUrl: '/src/assets/images/memorial_portrait_1795138788896.jpg',
  chapelBannerUrl: '/src/assets/images/chapel_botanical_banner_1795138788919.jpg',
  gardenMemoryUrl: '/src/assets/images/legacy_family_garden_1795138788378.jpg',
  scriptureMemoryUrl: '/src/assets/images/legacy_scripture_linen_1795138789553.jpg',
  anchorVerse: {
    text: 'Aku telah mengakhiri pertandingan yang baik, aku telah mencapai garis akhir dan aku telah memelihara iman.',
    reference: '2 Timotius 4:7',
  },
  serviceSummary: {
    serviceTitle: 'Ibadah Penghiburan (Bidston Malam)',
    dateLabel: 'Kamis, 19 November 2026',
    timeLabel: '18.00 WIB',
    venueLabel: 'Kapel Kasih Karunia, Kebayoran Baru',
    address: 'Jl. Wijaya Kusuma No. 18, Kebayoran Baru, Jakarta Selatan 12160',
  },
};

export const HYMNS: Record<HymnData['id'], HymnData> = {
  kj453: {
    id: 'kj453',
    code: 'KJ 453 : 1 – 3',
    title: 'Yesus Kawan yang Sejati',
    composer: 'Joseph Scriven (1855) · Lagu: Charles C. Converse (1868)',
    keySignature: 'F = do, 4/4',
    stanzas: [
      {
        number: 1,
        lines: [
          'Yesus Kawan yang sejati bagi kita yang lemah,',
          'tiap hal boleh dibawa dalam doa pada-Nya.',
          'O, betapa kita susah dan percuma berlelah,',
          'bila kurang pasrah diri dalam doa pada-Nya.',
        ],
      },
      {
        number: 2,
        lines: [
          'Jika oleh pencobaan kacau-balau hidupmu,',
          'jangan kau berputus asa; pada Tuhan berseru!',
          'Yesus Kawan yang setia, tidak ada tara-Nya.',
          'Ia tahu kelemahanmu; naikkan doa pada-Nya!',
        ],
      },
      {
        number: 3,
        lines: [
          'Adakah hatimu sarat, jiwa-ragamu lelah?',
          'Yesuslah Penolong kita; naikkan doa pada-Nya!',
          'Biar kawan lain menghilang, Yesus tinggal beserta.',
          'Ia mau menghibur kita atas doa pada-Nya.',
        ],
      },
    ],
  },
  nkb128: {
    id: 'nkb128',
    code: 'NKB 128 : 1 – 3',
    title: 'Ku Berserah kepada Allahku',
    composer: 'Judson W. Van De Venter (1896) · Lagu: Winfield S. Weeden',
    keySignature: 'D = do, 4/4',
    stanzas: [
      {
        number: 1,
        lines: [
          'Ku berserah kepada Allahku di darat pun di laut menderu.',
          'Tiap detik tak berhenti, Bapa Sorgawi t’rus menjagaku.',
        ],
      },
      {
        number: 1,
        isRefrain: true,
        lines: [
          'Ku tahu benar ku dipegang erat,',
          'di gunung tinggi dan samudera;',
          'di taufan g’lap ku didekap.',
          'Bapa Sorgawi t’rus menjagaku.',
        ],
      },
      {
        number: 2,
        lines: [
          'Mawar di taman dihiasi-Nya, elang di langit pun dipimpin-Nya.',
          'Dia tentu besertaku, Bapa Sorgawi t’rus menjagaku.',
        ],
      },
      {
        number: 3,
        lines: [
          'Kepada Tuhan aku berserah, di dalam kasih-Nya ku teduhlah.',
          'Dalam gelap, terang tetap, Bapa Sorgawi t’rus menjagaku.',
        ],
      },
    ],
  },
  kj416: {
    id: 'kj416',
    code: 'KJ 416 : 1 – 3',
    title: 'Tersembunyi Ujung Jalan',
    composer: 'Civilla D. Martin (1904) · Lagu: W. Stillman Martin (1904)',
    keySignature: 'Bes = do, 4/4',
    stanzas: [
      {
        number: 1,
        lines: [
          'Tersembunyi ujung jalan, hampir atau masih jauh;',
          'ku dibimbing tangan Tuhan ke neg’ri yang tak ku tahu.',
          'Bapa, ajar aku ikut, apa juga maksud-Mu,',
          'tak bersangsi atau takut, beriman tetap teguh.',
        ],
      },
      {
        number: 2,
        lines: [
          'Meski langkah-Mu semua tersembunyi bagiku,',
          'hatiku menurut jua dan memuji kasih-Mu.',
          'Meski kini tak ku tampak, nanti ku mengertilah,',
          'bila tiba di tujuan pada rumah Bapa-Nya.',
        ],
      },
      {
        number: 3,
        lines: [
          'Tuhan, janganlah biarkan ku berjalan sendiri;',
          'tuntun aku dalam iman hingga sampai ke neg’ri,',
          'tempat tiada lagi duka, air mata pun lenyap;',
          'dalam damai sejahtera ku bersama-Mu tetap.',
        ],
      },
    ],
  },
};

export const LITURGY_MOVEMENTS: LiturgyMovement[] = [
  {
    id: 'pembukaan',
    roman: 'Bagian I',
    title: 'Ibadah Pembukaan',
    subtitle: 'Menghimpun hati dalam keteduhan dan pengharapan akan kasih Allah',
  },
  {
    id: 'firman',
    roman: 'Bagian II',
    title: 'Pelayanan Firman & Penghiburan',
    subtitle: 'Mendengarkan sabda pengharapan yang meneguhkan keluarga yang berduka',
  },
  {
    id: 'penutup',
    roman: 'Bagian III',
    title: 'Doa Syafaat, Kenangan & Berkat',
    subtitle: 'Menyerahkan keluarga dalam pemeliharaan Tuhan dan pengutusan damai',
  },
];

export const LITURGY_STEPS: LiturgyStep[] = [
  {
    id: 'step-01',
    stepNumber: '01',
    movementId: 'pembukaan',
    title: 'Panggilan Beribadah',
    roleChip: 'Liturgos',
    roleVariant: 'sage',
    instruction: 'Jemaat dimohon tenang sejenak, mempersiapkan hati untuk menghadap hadirat Tuhan.',
    responsiveParts: [
      {
        speaker: 'P',
        label: 'Pemimpin',
        text: 'Saudara-saudari yang terkasih dalam Kristus, malam ini kita berhimpun bersama keluarga besar almarhumah Ibu Maria Magdalena Kusuma. Di tengah rasa duka dan kehilangan, kita datang bukan sebagai orang yang tanpa pengharapan, melainkan sebagai umat yang percaya pada kasih setia Tuhan yang melampaui maut.',
      },
      {
        speaker: 'J',
        label: 'Jemaat',
        text: 'Berharga di mata Tuhan kematian semua orang yang dikasihi-Nya.',
      },
      {
        speaker: 'P',
        label: 'Pemimpin',
        text: 'Marilah kita mengangkat hati kepada Allah, sumber segala penghiburan, yang menguatkan kita dalam setiap kesesakan dan menyeka setiap air mata.',
      },
      {
        speaker: 'J',
        label: 'Jemaat',
        text: 'Pertolongan kita adalah dalam nama Tuhan, yang menjadikan langit dan bumi.',
      },
    ],
  },
  {
    id: 'step-02',
    stepNumber: '02',
    movementId: 'pembukaan',
    title: 'Nyanyian Pujian Pembuka',
    roleChip: 'Jemaat',
    roleVariant: 'bronze',
    instruction: 'Jemaat diundang berdiri (bagi yang memungkinkan) menyanyikan pujian bersama.',
    hymn: HYMNS.kj453,
  },
  {
    id: 'step-03',
    stepNumber: '03',
    movementId: 'pembukaan',
    title: 'Votum, Salam & Doa Pembukaan',
    roleChip: 'Liturgos',
    roleVariant: 'sage',
    responsiveParts: [
      {
        speaker: 'P',
        label: 'Pemimpin',
        text: 'Ibadah penghiburan ini berlangsung dalam nama Bapa, Anak, dan Roh Kudus. Kasih karunia dan damai sejahtera dari Allah Bapa dan Tuhan kita Yesus Kristus menyertai saudara sekalian.',
      },
      {
        speaker: 'J',
        label: 'Jemaat',
        text: 'Dan menyertai saudara juga. Amin.',
      },
    ],
    prayerText: [
      'Ya Bapa yang penuh belas kasihan, kami mengucap syukur atas kehidupan kekasih kami, Ibu Maria Magdalena Kusuma, yang telah Engkau panggil pulang ke rumah-Mu yang baka. Peluklah keluarga yang ditinggalkan dengan damai-Mu yang melampaui segala akal. Berbicaralah kepada kami malam ini melalui Firman-Mu, agar hati yang berduka beroleh penghiburan sejati. Di dalam nama Tuhan Yesus Kristus kami berdoa. Amin.',
    ],
  },
  {
    id: 'step-04',
    stepNumber: '04',
    movementId: 'firman',
    title: 'Pembacaan Mazmur Penghiburan',
    roleChip: 'Pemimpin',
    roleVariant: 'sage',
    instruction: 'Dibacakan secara bersahut-sahutan antara Pemimpin dan Jemaat.',
    scripture: {
      reference: 'Mazmur 23 : 1 – 6',
      translation: 'Alkitab Terjemahan Baru (LAI)',
      verses: [
        'Tuhan adalah gembalaku, takkan kekurangan aku.',
        'Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang;',
        'Ia menyegarkan jiwaku. Ia menuntun aku di jalan yang benar oleh karena nama-Nya.',
        'Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.',
        'Engkau menyediakan hidangan bagiku, di hadapan lawanku; Engkau mengurapi kepalaku dengan minyak; pialaku penuh melimpah.',
        'Kebajikan dan kemurahan belaka akan mengikuti aku, seumur hidupku; dan aku akan diam dalam rumah Tuhan sepanjang masa.',
      ],
    },
  },
  {
    id: 'step-05',
    stepNumber: '05',
    movementId: 'firman',
    title: 'Persembahan Pujian Penghiburan',
    roleChip: 'Paduan Suara',
    roleVariant: 'neutral',
    instruction: 'Lagu pujian dibawakan oleh Paduan Suara Wilayah Emaus sebagai ungkapan iman dan doa bagi keluarga.',
    prayerText: [
      '“Dalam lembah air mata pun kasih-Mu tetap menopang; di rumah Bapa tiada lagi sedu sedan, hanya damai yang kekal.”',
    ],
  },
  {
    id: 'step-06',
    stepNumber: '06',
    movementId: 'firman',
    title: 'Renungan Firman Tuhan',
    roleChip: 'Pelayan Firman',
    roleVariant: 'sage',
    scripture: {
      reference: 'Yohanes 14 : 1 – 3',
      translation: 'Alkitab Terjemahan Baru (LAI)',
      verses: [
        '“Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku.',
        'Di rumah Bapa-Ku banyak tempat tinggal. Jika tidak demikian, tentu Aku mengatakannya kepadamu. Sebab Aku pergi ke situ untuk menyediakan tempat bagimu.',
        'Dan apabila Aku telah pergi ke situ dan telah menyediakan tempat bagimu, Aku akan datang kembali dan membawa kamu ke tempat-Ku, supaya di tempat di mana Aku berada, kamu pun berada.”',
      ],
    },
    reflectionNotes: {
      preacher: 'Pdt. Hendra Wijaya, M.Th.',
      theme: 'Pulang ke Rumah yang Telah Disediakan',
      summary:
        'Renungan mengajak keluarga dan jemaat memaknai kepergian Ibu Maria Magdalena Kusuma bukan sebagai perpisahan tanpa ujung, melainkan kepulangan seorang hamba yang setia menuju rumah Bapa yang penuh damai.',
      points: [
        'Pengharapan Kristen berdiri di atas janji Kristus sendiri: “Janganlah gelisah hatimu.”',
        'Kematian bagi orang percaya adalah peralihan dari ruang fana menuju kediaman kekal yang telah dipersiapkan Tuhan.',
        'Warisan iman, doa, dan kelembutan kasih Ibu Magdalena terus hidup di dalam langkah anak, cucu, serta jemaat yang dilayaninya.',
      ],
    },
  },
  {
    id: 'step-07',
    stepNumber: '07',
    movementId: 'firman',
    title: 'Nyanyian Respons Iman',
    roleChip: 'Jemaat',
    roleVariant: 'bronze',
    hymn: HYMNS.nkb128,
  },
  {
    id: 'step-08',
    stepNumber: '08',
    movementId: 'penutup',
    title: 'Doa Syafaat & Doa Bapa Kami',
    roleChip: 'Pelayan Firman',
    roleVariant: 'sage',
    instruction: 'Doa syafaat bagi keluarga yang berduka, ditutup dengan mengucapkan Doa Bapa Kami secara bersama-sama.',
    responsiveParts: [
      {
        speaker: 'Semua',
        label: 'Semua (Jemaat & Pemimpin)',
        text: 'Bapa kami yang di sorga, dikuduskanlah nama-Mu, datanglah Kerajaan-Mu, jadilah kehendak-Mu di bumi seperti di sorga. Berikanlah kami pada hari ini makanan kami yang secukupnya dan ampunilah kami akan kesalahan kami, seperti kami juga mengampuni orang yang bersalah kepada kami; dan janganlah membawa kami ke dalam pencobaan, tetapi lepaskanlah kami dari pada yang jahat. Karena Engkaulah yang empunya Kerajaan dan kuasa dan kemuliaan sampai selama-lamanya. Amin.',
      },
    ],
  },
  {
    id: 'step-09',
    stepNumber: '09',
    movementId: 'penutup',
    title: 'Ungkapan Terima Kasih Keluarga',
    roleChip: 'Keluarga',
    roleVariant: 'neutral',
    familyMessage: {
      representative: 'Bpk. Yohanes Adi Kusuma (Putra Sulung)',
      paragraphs: [
        'Atas nama seluruh keluarga besar almarhumah Ibu Maria Magdalena Kusuma, kami menghaturkan terima kasih yang tulus atas kehadiran, perhatian, bunga penghiburan, serta doa yang bapak, ibu, dan saudara sekalian panjatkan bagi kami di masa duka ini.',
        'Kiranya Tuhan Yang Maha Pengasih membalas setiap kebaikan saudara sekalian dengan berkat dan damai sejahtera yang berlimpah. Mohon dimaafkan apabila selama hidupnya ibunda kami memiliki kekhilafan dalam tutur kata maupun perbuatan.',
      ],
    },
  },
  {
    id: 'step-10',
    stepNumber: '10',
    movementId: 'penutup',
    title: 'Nyanyian Pengutusan & Berkat',
    roleChip: 'Pelayan Firman',
    roleVariant: 'sage',
    hymn: HYMNS.kj416,
    responsiveParts: [
      {
        speaker: 'P',
        label: 'Pelayan Firman',
        text: 'Arahkanlah hatimu kepada Tuhan dan terimalah berkat-Nya: “Tuhan memberkati engkau dan melindungi engkau; Tuhan menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia; Tuhan menghadapkan wajah-Nya kepadamu dan memberi engkau damai sejahtera.”',
      },
      {
        speaker: 'J',
        label: 'Jemaat',
        text: 'Amin, amin, amin.',
      },
    ],
  },
];

export const LIFE_BIOGRAPHY = {
  leadParagraph:
    'Lahir di lereng sejuk Kota Salatiga pada 14 April 1942, Maria Magdalena tumbuh dalam keluarga sederhana yang menanamkan ketekunan doa dan kemurahan hati sejak usia dini. Sepanjang delapan puluh empat tahun peziarahan hidupnya, ia dikenal sebagai ibu yang teduh tutur katanya, lembut tangannya merawat sesama, dan setia mendampingi setiap generasi dengan doa-doa fajarnya.',
  secondParagraph:
    'Pada tahun 1968, beliau dipersatukan dalam pernikahan kudus bersama Alm. Bpk. Lukas Hendarto Kusuma. Bersama sang suami, ia membangun rumah tangga yang hangat dan terbuka bagi siapa saja—tempat di mana para mahasiswa perantauan, kerabat, hingga tetangga selalu menemukan sepoci teh hangat dan telinga yang sudi mendengar tanpa menghakimi.',
  thirdParagraph:
    'Selama lebih dari tiga dekade, Ibu Magdalena mengabdikan dirinya sebagai guru Sekolah Minggu dan pelayan kunjungan lansia di gereja. Bahkan ketika raganya mulai melemah di usia senja, Alkitab kulit tuanya tidak pernah jauh dari meja beranda, menjadi saksi bisu ribuan nama anak, cucu, dan sahabat yang ia sebut satu per satu di hadapan Tuhan hingga tarikan napasnya yang tenang pada 17 November 2026.',
  milestones: [
    {
      year: '1942',
      location: 'Salatiga',
      title: 'Kelahiran & Masa Kecil',
      description: 'Lahir sebagai putri kedua dari pasangan Bpk. Daniel Pranoto dan Ibu Elizabeth Sumarni.',
    },
    {
      year: '1968',
      location: 'Semarang',
      title: 'Pernikahan Kudus',
      description: 'Menikah dengan Alm. Bpk. Lukas Hendarto Kusuma dan dikaruniai tiga orang putra-putri.',
    },
    {
      year: '1975 – 2007',
      location: 'Jakarta Selatan',
      title: 'Pelayanan Guru Sekolah Minggu',
      description: 'Melayani selama 32 tahun membimbing anak-anak jemaat serta aktif dalam pelayanan diakonia.',
    },
    {
      year: '2014 – 2025',
      location: 'Keluarga Besar',
      title: 'Matriark Penuh Kasih',
      description: 'Menikmati masa senja merawat kebun anggrek putih dan membimbing tujuh cucu tercinta dalam iman.',
    },
    {
      year: '2026',
      location: 'Jakarta',
      title: 'Berpulang ke Rumah Bapa',
      description: 'Berpulang dengan tenang dalam tidur pada usia 84 tahun, dikelilingi doa dan kasih anak-cucu.',
    },
  ] as LifeMilestone[],
  familyLineage: [
    {
      role: 'Suami (Almarhum)',
      names: ['Alm. Bpk. Lukas Hendarto Kusuma (Berpulang 2016)'],
    },
    {
      role: 'Anak & Menantu',
      names: [
        'Bpk. Yohanes Adi Kusuma & Ibu Ruth Larasati',
        'Ibu Naomi Putri Kusuma & Bpk. Samuel Wijaya',
        'Bpk. Timotius Budi Kusuma & Ibu Clara Natalia',
      ],
    },
    {
      role: 'Cucu-cucu Tercinta',
      names: [
        'Daniel, Grace, Esther, Jonathan, Abigail, Nathanael, dan Lukas Jr.',
      ],
    },
  ],
};

export const SERVICE_SCHEDULES: ServiceScheduleItem[] = [
  {
    id: 'penghiburan',
    title: 'Ibadah Penghiburan (Malam Ini)',
    dayDate: 'Kamis, 19 November 2026',
    time: '18.00 – 19.30 WIB',
    venue: 'Kapel Kasih Karunia — Ruang Emaus',
    address: 'Jl. Wijaya Kusuma No. 18, Kebayoran Baru, Jakarta Selatan',
    officiant: 'Pdt. Hendra Wijaya, M.Th.',
    notes: 'Tersedia area parkir di sisi timur kapel dan layanan kursi roda di pintu utama.',
  },
  {
    id: 'pelepasan',
    title: 'Ibadah Tutup Peti & Pelepasan',
    dayDate: 'Jumat, 20 November 2026',
    time: '09.00 – 10.30 WIB',
    venue: 'Kapel Kasih Karunia — Ruang Utama',
    address: 'Jl. Wijaya Kusuma No. 18, Kebayoran Baru, Jakarta Selatan',
    officiant: 'Pdt. Ester Rahmawati, S.Si.',
    notes: 'Pemberangkatan jenazah menuju tempat peristirahatan terakhir pukul 10.45 WIB.',
  },
  {
    id: 'pemakaman',
    title: 'Ibadah Pemakaman',
    dayDate: 'Jumat, 20 November 2026',
    time: '11.30 – 12.30 WIB',
    venue: 'Taman Pemakaman Umum Tanah Kusir (Blok Kristen AA-II)',
    address: 'Jl. Bintaro Raya, Kebayoran Lama, Jakarta Selatan',
    officiant: 'Pdt. Hendra Wijaya, M.Th.',
    notes: 'Keluarga menyediakan minuman ringan dan payung teduh di area pemakaman.',
  },
];

export const INITIAL_CONDOLENCES: CondolenceEntry[] = [
  {
    id: 'cond-1',
    name: 'Pdt. (Em.) Surya Darmawan & Keluarga',
    relation: 'GKI Kebayoran Baru',
    category: 'Jemaat & Pelayan',
    message:
      'Turut berdukacita sedalam-dalamnya atas berpulangnya Ibu Maria Magdalena Kusuma. Kami mengenang ketulusan beliau saat melayani Sekolah Minggu berpuluh tahun silam. Kiranya Roh Penghibur menguatkan Mas Adi, Mbak Naomi, Mas Budi, dan seluruh cucu.',
    createdAt: '2 jam yang lalu',
  },
  {
    id: 'cond-2',
    name: 'dr. Ratna Suryani',
    relation: 'Sahabat Pelayanan Diakonia',
    category: 'Sahabat & Rekan',
    message:
      'Selamat jalan, Ibu Magdalena terkasih. Kelembutan tutur kata dan senyum tenang Ibu akan selalu hidup di ingatan kami. Pertandingan yang baik telah Ibu akhiri dengan setia.',
    createdAt: '4 jam yang lalu',
  },
  {
    id: 'cond-3',
    name: 'Keluarga Besar Pranoto (Salatiga)',
    relation: 'Adik & Keponakan',
    category: 'Keluarga',
    message:
      'Sugeng tindak, Mbak Magda. Terima kasih telah menjadi kakak tertua yang selalu merangkul dan mendoakan kami di Salatiga. Beristirahatlah dalam damai Tuhan Yesus Kristus.',
    createdAt: '6 jam yang lalu',
  },
  {
    id: 'cond-4',
    name: 'Paduan Suara Wilayah Emaus',
    relation: 'Rekan Sepersekutuan',
    category: 'Jemaat & Pelayan',
    message:
      'Kami berdoa kiranya pengharapan di dalam Yohanes 14 menjadi pelita yang menghibur hati keluarga besar Kusuma malam ini dan hari-hari mendatang.',
    createdAt: 'Kemarin',
  },
];
