export type RegionOrigin = 'Korea' | 'China' | 'Thailand' | 'Japan';
export type ContentCategory = 'K-Drama' | 'Variety' | 'C-Drama' | 'Thai' | 'Anime';
export type SubtitleLanguage = 'English' | '中文' | 'Bahasa';

export interface Episode {
  number: number;
  title: string;
  duration: string;
  durationSeconds: number;
  releaseNote: string;
  synopsis: string;
  thumbnail: string;
  isPremiumOnly: boolean;
  sampleSubtitles: Record<SubtitleLanguage, string[]>;
}

export interface Show {
  id: string;
  title: string;
  nativeTitle: string;
  region: RegionOrigin;
  category: ContentCategory;
  year: number;
  totalEpisodes: number;
  availableEpisodes: number;
  genres: string[];
  audioLanguage: string;
  subtitles: SubtitleLanguage[];
  isOriginal: boolean;
  isPremium: boolean;
  topRank?: number;
  simulcastNote?: string;
  posterUrl: string;
  backdropUrl: string;
  cast: string[];
  director: string;
  synopsis: string;
  episodes: Episode[];
}

const IMAGES = {
  heroSeoulRomance: '/src/assets/images/hero_seoul_romance_1795157367866.jpg',
  heroJoseonCrown: '/src/assets/images/hero_joseon_crown_1795157367838.jpg',
  heroTokyoNoir: '/src/assets/images/hero_tokyo_noir_1795157367383.jpg',
  posterHospital: '/src/assets/images/poster_kdrama_hospital_1795157366949.jpg',
  posterMystery: '/src/assets/images/poster_kdrama_mystery_1795157367769.jpg',
  posterXianxia: '/src/assets/images/poster_cdrama_xianxia_1795157367694.jpg',
  posterVariety: '/src/assets/images/poster_variety_running_1795157366471.jpg',
  posterThai: '/src/assets/images/poster_thai_romance_1795157367799.jpg',
  posterAnime: '/src/assets/images/poster_anime_cyber_1795157366146.jpg',
  stillCafe: '/src/assets/images/still_episode_cafe_1795157367676.jpg',
  stillStage: '/src/assets/images/still_episode_stage_1795157367582.jpg',
  stillPalace: '/src/assets/images/still_episode_palace_1795157367734.jpg',
};

function makeEpisodes(
  count: number,
  stillA: string,
  stillB: string,
  prefix: string,
  freeLimit: number,
  dialoguePool: { en: string[]; zh: string[]; ms: string[] }
): Episode[] {
  return Array.from({ length: count }, (_, idx) => {
    const epNum = idx + 1;
    const isEven = epNum % 2 === 0;
    return {
      number: epNum,
      title: `${prefix} ${epNum}`,
      duration: isEven ? '64 min' : '61 min',
      durationSeconds: isEven ? 3840 : 3660,
      releaseNote: epNum === count ? 'New · 8h after Korea' : 'HD · Multi-Sub',
      synopsis:
        epNum === 1
          ? 'An unexpected encounter sets parallel lives on a collision course across the city.'
          : `New revelations raise the stakes as alliances shift in episode ${epNum}.`,
      thumbnail: isEven ? stillB : stillA,
      isPremiumOnly: epNum > freeLimit,
      sampleSubtitles: {
        English: dialoguePool.en,
        中文: dialoguePool.zh,
        Bahasa: dialoguePool.ms,
      },
    };
  });
}

export const SHOW_CATALOG: Show[] = [
  {
    id: 'autumn-over-hangang',
    title: 'Autumn Over Hangang',
    nativeTitle: '한강의 가을',
    region: 'Korea',
    category: 'K-Drama',
    year: 2026,
    totalEpisodes: 16,
    availableEpisodes: 12,
    genres: ['Romance', 'Melodrama'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: true,
    isPremium: false,
    topRank: 1,
    simulcastNote: 'New Ep Thu & Fri',
    posterUrl: IMAGES.posterHospital,
    backdropUrl: IMAGES.heroSeoulRomance,
    cast: ['Lee Do-hyun', 'Shin Hye-sun', 'Kim Jae-wook'],
    director: 'Ahn Pan-seok',
    synopsis:
      'Seven years after parting on a rainy Seoul bridge, an architectural restorer and a cellist cross paths while renovating a riverside concert hall.',
    episodes: makeEpisodes(8, IMAGES.heroSeoulRomance, IMAGES.stillCafe, 'Chapter', 4, {
      en: [
        'I walked across this bridge every October hoping you might look back.',
        'Some melodies wait seven winters before anyone dares to play them again.',
        'Wait—don’t leave your umbrella behind this time.',
      ],
      zh: [
        '每年十月我都会走过这座桥，盼望你会回头看一眼。',
        '有些旋律等待了七个冬天，才终于有人敢再次奏响。',
        '等等——这一次，别再把伞留下了。',
      ],
      ms: [
        'Setiap Oktober saya melintas jambatan ini berharap awak menoleh kembali.',
        'Ada melodi yang menunggu tujuh musim sejuk sebelum dimainkan semula.',
        'Tunggu—jangan tinggalkan payung awak kali ini.',
      ],
    }),
  },
  {
    id: 'crown-of-silent-lanterns',
    title: 'Crown of Silent Lanterns',
    nativeTitle: '침묵의 등불',
    region: 'Korea',
    category: 'K-Drama',
    year: 2026,
    totalEpisodes: 20,
    availableEpisodes: 14,
    genres: ['Historical', 'Thriller'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: true,
    isPremium: true,
    topRank: 2,
    simulcastNote: 'Viu Original · 8h Simulcast',
    posterUrl: IMAGES.posterMystery,
    backdropUrl: IMAGES.heroJoseonCrown,
    cast: ['Ju Ji-hoon', 'Han Hyo-joo', 'Heo Joon-ho'],
    director: 'Kim Sung-hoon',
    synopsis:
      'When sealed royal ledgers vanish from the palace archive, a disgraced royal scribe uncovers a conspiracy reaching the inner throne room.',
    episodes: makeEpisodes(8, IMAGES.heroJoseonCrown, IMAGES.stillPalace, 'Chronicle', 2, {
      en: [
        'Every lantern lit in the eastern courtyard marks a secret we swore to bury.',
        'Read the ink beneath the wax seal before dawn reaches the gate.',
        'The throne remembers loyalty far longer than it forgives silence.',
      ],
      zh: [
        '东院点亮的每一盏灯笼，都记录着我们发誓掩埋的秘密。',
        '在黎明照亮宫门之前，先读出火漆下的字迹。',
        '王座记住忠诚的时间，远比宽恕沉默更长久。',
      ],
      ms: [
        'Setiap tanglung yang menyala di halaman timur menyimpan rahsia lama.',
        'Baca tulisan di bawah mohor lilin sebelum fajar tiba di pintu istana.',
        'Takhta mengingati kesetiaan lebih lama daripada memaafkan kebisuan.',
      ],
    }),
  },
  {
    id: 'neon-rain-precinct-9',
    title: 'Midnight Precinct Nine',
    nativeTitle: '심야 제9관할서',
    region: 'Korea',
    category: 'K-Drama',
    year: 2026,
    totalEpisodes: 12,
    availableEpisodes: 12,
    genres: ['Crime', 'Mystery'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文'],
    isOriginal: true,
    isPremium: true,
    topRank: 3,
    simulcastNote: 'All Episodes Out',
    posterUrl: IMAGES.posterMystery,
    backdropUrl: IMAGES.heroTokyoNoir,
    cast: ['Cho Seung-woo', 'Bae Doona', 'Park Hae-soo'],
    director: 'Han Jun-hee',
    synopsis:
      'A veteran homicide detective and a forensic acoustic analyst trace encrypted radio broadcasts linked to cold cases across harbor districts.',
    episodes: makeEpisodes(8, IMAGES.heroTokyoNoir, IMAGES.stillCafe, 'Case File', 2, {
      en: [
        'The rain washes away tire tracks, never the echo on the frequency.',
        'Compare the harbor chime at 02:14 against last winter’s recording.',
        'Someone inside Precinct Nine already knows we unlocked the vault.',
      ],
      zh: [
        '雨水能冲刷车辙，却冲不掉频段里的回声。',
        '把凌晨两点十四分的港口钟声和去年冬天的录音做个比对。',
        '第九警署里有人已经知道我们打开了证物库。',
      ],
      ms: [
        'Hujan memadam kesan tayar, tetapi bukan gema pada frekuensi radio.',
        'Bandingkan bunyi loceng pelabuhan jam 02:14 dengan rakaman tahun lalu.',
        'Seseorang di Balai Sembilan sudah tahu kita membuka bilik kebal itu.',
      ],
    }),
  },
  {
    id: 'seoul-ward-24',
    title: 'Seoul Ward 24',
    nativeTitle: '서울 24병동',
    region: 'Korea',
    category: 'K-Drama',
    year: 2026,
    totalEpisodes: 16,
    availableEpisodes: 10,
    genres: ['Medical', 'Human Drama'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: false,
    isPremium: false,
    topRank: 4,
    simulcastNote: 'Free Ep 1–4',
    posterUrl: IMAGES.posterHospital,
    backdropUrl: IMAGES.stillCafe,
    cast: ['Yoo Yeon-seok', 'Jeon Mi-do', 'Kang Hoon'],
    director: 'Shin Won-ho',
    synopsis:
      'Inside a bustling trauma center, five surgical fellows balance marathon night shifts, impossible calls, and quiet camaraderie over late-night coffee.',
    episodes: makeEpisodes(6, IMAGES.stillCafe, IMAGES.heroSeoulRomance, 'Shift', 4, {
      en: [
        'Two minutes to prep OR Three—grab your gloves and breathe.',
        'Doctors lose sleep so families get another morning together.',
        'I saved you the last cup of hazelnut americano from the lobby.',
      ],
      zh: [
        '三号手术室还有两分钟准备——戴上手套，深呼吸。',
        '医生熬过长夜，只为让家人能多拥有一个清晨。',
        '我帮你留了大厅里最后一杯榛果美式。',
      ],
      ms: [
        'Dua minit untuk sediakan Bilik Bedah Tiga—sarungkan sarung tangan.',
        'Doktor berjaga malam supaya keluarga dapat melihat pagi yang baharu.',
        'Saya simpankan secawan americano terakhir dari lobi untuk awak.',
      ],
    }),
  },
  {
    id: 'celadon-mist-chronicles',
    title: 'Celadon Mist Chronicles',
    nativeTitle: '青瓷烟雨录',
    region: 'China',
    category: 'C-Drama',
    year: 2026,
    totalEpisodes: 36,
    availableEpisodes: 28,
    genres: ['Xianxia', 'Romance'],
    audioLanguage: 'Mandarin',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: false,
    isPremium: false,
    topRank: 5,
    simulcastNote: 'Daily at 20:00 SGT',
    posterUrl: IMAGES.posterXianxia,
    backdropUrl: IMAGES.stillPalace,
    cast: ['Bai Lu', 'Luo Yunxi', 'Cheng Yi'],
    director: 'Guo Jingming',
    synopsis:
      'Exiled to the Cloud Peak sanctuary, an immortal artisan must forge three celestial seals to restore peace between mortal kingdoms and mountain spirits.',
    episodes: makeEpisodes(8, IMAGES.stillPalace, IMAGES.heroJoseonCrown, 'Scroll', 5, {
      en: [
        'A thousand years in the mist cannot erase one promise made under autumn maples.',
        'Guard the celadon spirit vessel; its crack will wake the northern ridge.',
        'Even immortals hesitate when destiny demands a mortal heart.',
      ],
      zh: [
        '云雾中的千年修行，也抹不去秋枫下的那句承诺。',
        '护好这尊青瓷灵器，它若裂开，北岭便会苏醒。',
        '纵然是仙人，在命运索求凡心时也会动摇。',
      ],
      ms: [
        'Seribu tahun di dalam kabus tidak mampu memadam satu janji lama.',
        'Jaga bekas jed seladon itu sebelum retaknya mengejutkan pergunungan utara.',
        'Malah makhluk abadi turut ragu apabila takdir menuntut hati manusia.',
      ],
    }),
  },
  {
    id: 'running-man-sg-special',
    title: 'Running Man: Midnight Dash',
    nativeTitle: '런닝맨',
    region: 'Korea',
    category: 'Variety',
    year: 2026,
    totalEpisodes: 720,
    availableEpisodes: 720,
    genres: ['Variety', 'Comedy'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: false,
    isPremium: false,
    topRank: 6,
    simulcastNote: 'Every Mon · Free HD',
    posterUrl: IMAGES.posterVariety,
    backdropUrl: IMAGES.stillStage,
    cast: ['Yoo Jae-suk', 'Kim Jong-kook', 'Song Ji-hyo', 'Haha'],
    director: 'Choi Hyung-in',
    synopsis:
      'Korea’s beloved variety cast returns with high-stakes name-tag chases, outrageous studio quiz traps, and surprise celebrity alliances.',
    episodes: makeEpisodes(6, IMAGES.stillStage, IMAGES.posterVariety, 'Race Ep', 6, {
      en: [
        'Wait—did Jae-suk just hide the golden clue inside his own shoe?!',
        'Ten seconds left on the buzzer! Nobody touch the red button!',
        'If our team wins lunch today, Jong-kook has to sing the ballad.',
      ],
      zh: [
        '等等——在石哥刚才是不是把金色线索藏进鞋子里了？！',
        '倒计时最后十秒！谁都别碰那个红色按钮！',
        '如果今天我们队赢了午餐，钟国哥就得唱那首抒情歌。',
      ],
      ms: [
        'Tunggu—adakah Jae-suk baru sahaja sembunyikan petunjuk di dalam kasutnya?!',
        'Tinggal sepuluh saat lagi! Jangan sesiapa sentuh butang merah itu!',
        'Jika pasukan kita menang hari ini, Jong-kook kena nyanyi lagu balada.',
      ],
    }),
  },
  {
    id: 'chao-phraya-sunset',
    title: 'Letters at Chao Phraya',
    nativeTitle: 'จดหมายริมเจ้าพระยา',
    region: 'Thailand',
    category: 'Thai',
    year: 2026,
    totalEpisodes: 14,
    availableEpisodes: 11,
    genres: ['Romance', 'Slice of Life'],
    audioLanguage: 'Thai',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: true,
    isPremium: false,
    topRank: 7,
    simulcastNote: 'New Ep Sat',
    posterUrl: IMAGES.posterThai,
    backdropUrl: IMAGES.heroSeoulRomance,
    cast: ['Bright Vachirawit', 'Tu Tontawan', 'Win Metawin'],
    director: 'Nattawut Poonpiriya',
    synopsis:
      'A bookshop archivist living beside a Bangkok river pier discovers unsent postcards from 1998 that reunite two estranged families.',
    episodes: makeEpisodes(6, IMAGES.heroSeoulRomance, IMAGES.stillCafe, 'Postcard', 3, {
      en: [
        'The evening ferry always slows down right when the temple lights come on.',
        'Look at the postmark—your grandmother sent this from Singapore.',
        'We still have one summer left before the pier closes for repairs.',
      ],
      zh: [
        '每当寺庙亮起灯光时，傍晚的渡轮总会放慢速度。',
        '看这个邮戳——是你外婆当年从新加坡寄来的。',
        '在码头停修之前，我们还有一整个夏天。',
      ],
      ms: [
        'Feri senja sentiasa memperlahankan laju apabila lampu kuil mula menyala.',
        'Lihat cop pos ini—nenek awak menghantarnya dari Singapura.',
        'Kita masih mempunyai satu musim panas sebelum jeti ini ditutup.',
      ],
    }),
  },
  {
    id: 'crescent-blade-requiem',
    title: 'Crescent Blade Requiem',
    nativeTitle: '三日月鎮魂歌',
    region: 'Japan',
    category: 'Anime',
    year: 2026,
    totalEpisodes: 24,
    availableEpisodes: 18,
    genres: ['Dark Fantasy', 'Action'],
    audioLanguage: 'Japanese',
    subtitles: ['English', '中文'],
    isOriginal: false,
    isPremium: true,
    topRank: 8,
    simulcastNote: 'Simulcast · 1080p',
    posterUrl: IMAGES.posterAnime,
    backdropUrl: IMAGES.heroTokyoNoir,
    cast: ['Kenjiro Tsuda', 'Saori Hayami', 'Yuichi Nakamura'],
    director: 'Haruo Sotozaki',
    synopsis:
      'In a mountain realm shrouded in twilight ash, a wandering blade-smith hunts spirit-forged relics before the eclipse awakens the old seal.',
    episodes: makeEpisodes(6, IMAGES.heroTokyoNoir, IMAGES.stillPalace, 'Act', 3, {
      en: [
        'Steel remembers the hand that tempered it—never the oath that broke.',
        'Do not draw the crescent edge until the mist clears the ridge.',
        'Under this moon, even shadows cast a blade of their own.',
      ],
      zh: [
        '刀锋只记得锻造它的双手，从不记得背弃的誓言。',
        '山脊的雾气散开前，千万别拔出那柄弦月刃。',
        '在这轮明月之下，连影子都有自己的锋芒。',
      ],
      ms: [
        'Besi mengingati tangan yang menempanya—bukan sumpah yang dikhianati.',
        'Jangan hunus bilah sabit sehingga kabus di rabung gunung reda.',
        'Di bawah bulan ini, bayang-bayang juga memiliki mata pedangnya sendiri.',
      ],
    }),
  },
  {
    id: 'the-verdict-rain',
    title: 'Glass Verdict',
    nativeTitle: '유리 평결',
    region: 'Korea',
    category: 'K-Drama',
    year: 2025,
    totalEpisodes: 16,
    availableEpisodes: 16,
    genres: ['Legal', 'Suspense'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: true,
    isPremium: true,
    topRank: 9,
    simulcastNote: 'Complete Series',
    posterUrl: IMAGES.posterMystery,
    backdropUrl: IMAGES.stillCafe,
    cast: ['Kim Hye-soo', 'Lee Je-hoon', 'Um Ki-joon'],
    director: 'Park Chan-hong',
    synopsis:
      'An uncompromising appellate prosecutor reopens a sealed corporate whistleblower trial after a key witness mails her an unredacted transcript.',
    episodes: makeEpisodes(6, IMAGES.stillCafe, IMAGES.heroTokyoNoir, 'Hearing', 2, {
      en: [
        'The truth isn’t missing—it was stamped confidential in 2019.',
        'Your Honor, Exhibit B proves the board met three hours before the fire.',
        'You can silence one reporter, not four hundred court transcripts.',
      ],
      zh: [
        '真相并没有消失——它只是在2019年被盖上了机密印章。',
        '法官大人，B号证物证明董事会在火灾前三小时召开过会议。',
        '你可以让一位记者沉默，却无法掩盖四百页庭审记录。',
      ],
      ms: [
        'Kebenaran tidak hilang—ia cuma dicop sulit pada tahun 2019.',
        'Yang Arif, Bukti B membuktikan lembaga pengarah bermesyuarat sebelum kebakaran.',
        'Awak boleh mendiamkan seorang wartawan, bukan empat ratus transkrip mahkamah.',
      ],
    }),
  },
  {
    id: 'golden-stage-duel',
    title: 'Stage Duel: Asia Stars',
    nativeTitle: '스테이지 듀얼',
    region: 'Korea',
    category: 'Variety',
    year: 2026,
    totalEpisodes: 12,
    availableEpisodes: 9,
    genres: ['Music', 'Competition'],
    audioLanguage: 'Korean',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: true,
    isPremium: false,
    topRank: 10,
    simulcastNote: 'Free Full Episodes',
    posterUrl: IMAGES.posterVariety,
    backdropUrl: IMAGES.stillStage,
    cast: ['Lee Hyori', 'Jay Park', 'Sung Si-kyung'],
    director: 'Kim Tae-ho',
    synopsis:
      'Vocalists and live band arrangers from Seoul, Taipei, Bangkok, and Singapore team up for 48-hour live stage mashup battles.',
    episodes: makeEpisodes(6, IMAGES.stillStage, IMAGES.heroSeoulRomance, 'Round', 6, {
      en: [
        'Wait until you hear the acoustic arrangement they wrote at 3 a.m.!',
        'The audience decibel meter just broke 112—standing ovation!',
        'Next week, Singapore and Bangkok producers swap lead vocalists.',
      ],
      zh: [
        '等你们听见他们凌晨三点改出来的木吉他编曲就知道了！',
        '现场分贝仪刚刚突破112——全场起立鼓掌！',
        '下周，新加坡和曼谷的制作人将互换主唱。',
      ],
      ms: [
        'Tunggu sehingga anda dengar susunan akustik yang mereka tulis jam 3 pagi!',
        'Meter desibel penonton baru melepasi 112—tepukan gemuruh!',
        'Minggu depan, penerbit Singapura dan Bangkok bertukar vokalis utama.',
      ],
    }),
  },
  {
    id: 'jade-lantern-court',
    title: 'Court of Jade & Pine',
    nativeTitle: '玉松朝堂',
    region: 'China',
    category: 'C-Drama',
    year: 2026,
    totalEpisodes: 40,
    availableEpisodes: 22,
    genres: ['Costume', 'Mystery'],
    audioLanguage: 'Mandarin',
    subtitles: ['English', '中文'],
    isOriginal: false,
    isPremium: false,
    simulcastNote: 'New Ep Daily',
    posterUrl: IMAGES.posterXianxia,
    backdropUrl: IMAGES.stillPalace,
    cast: ['Zhang Ruoyun', 'Li Qin', 'Wu Lei'],
    director: 'Sun Hao',
    synopsis:
      'A sharp-witted imperial auditor teams up with a tea-house strategist to untangle tribute silver shortages across three river provinces.',
    episodes: makeEpisodes(6, IMAGES.stillPalace, IMAGES.heroJoseonCrown, 'Chapter', 4, {
      en: [
        'Check the weight of the salt barges before the rain swells the canal.',
        'A single brush stroke in the ministry ledger tells a cleaner story than spies.',
        'Drink the first steep slowly; our guest from Jinling has arrived.',
      ],
      zh: [
        '趁暴雨还未涨满运河，先核对盐船的吃水重量。',
        '户部账册里的半笔墨痕，比密探查来的消息更诚实。',
        '第一泡茶慢慢饮，金陵来的客人已经到了。',
      ],
      ms: [
        'Periksa muatan tongkang garam sebelum hujan memenuhi terusan.',
        'Satu calitan dakwat di buku akaun kementerian lebih jujur daripada perisik.',
        'Minum teh pertama perlahan-lahan; tetamu dari Jinling sudah tiba.',
      ],
    }),
  },
  {
    id: 'bangkok-night-market',
    title: 'Midnight Flavors of Thonburi',
    nativeTitle: 'รสชาติยามค่ำคืน',
    region: 'Thailand',
    category: 'Thai',
    year: 2025,
    totalEpisodes: 10,
    availableEpisodes: 10,
    genres: ['Culinary', 'Romance'],
    audioLanguage: 'Thai',
    subtitles: ['English', '中文', 'Bahasa'],
    isOriginal: false,
    isPremium: false,
    simulcastNote: 'Complete · Free',
    posterUrl: IMAGES.posterThai,
    backdropUrl: IMAGES.stillCafe,
    cast: ['Baifern Pimchanok', 'Nadech Kugimiya'],
    director: 'Songyos Sugmakanan',
    synopsis:
      'A pastry chef returning from Lyon and a late-night wok master compete—and unexpectedly fall for each other—at a historic canal market.',
    episodes: makeEpisodes(6, IMAGES.stillCafe, IMAGES.stillStage, 'Dish', 6, {
      en: [
        'Palm sugar caramelized over charcoal can outshine any French glaze.',
        'Save table four by the canal—she always orders jasmine tea at midnight.',
        'If our pop-up sells out tonight, we sign the shophouse lease tomorrow.',
      ],
      zh: [
        '炭火慢慢熬出的椰糖焦香，绝不输给任何法式淋面。',
        '把靠运河的四号桌留着——她总在午夜点一壶茉莉花茶。',
        '如果今晚快闪店卖光，明天我们就签下那间老店屋。',
      ],
      ms: [
        'Gula melaka yang dimasak atas arang mampu menandingi mana-mana glis Perancis.',
        'Simpan meja empat di tepi terusan—dia selalu pesan teh melati tengah malam.',
        'Jika gerai kita habis dijual malam ini, esok kita tandatangani sewa kedai.',
      ],
    }),
  },
];

export const HERO_SLIDE_IDS = [
  'autumn-over-hangang',
  'crown-of-silent-lanterns',
  'neon-rain-precinct-9',
];
