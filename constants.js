// ─── 8가지 감정 ──────────────────────────────────────
// id     : 내부 키
// label  : 화면에 보이는 한국어 감정 이름
// color  : 감정 카드의 색상 점
// glow   : 빛 효과 색상
export const MOODS = [
  { id: 'happy',      label: '기쁨',   color: '#F5C518', glow: 'rgba(255, 224, 102, 0.9)' },
  { id: 'hopeful',    label: '희망',   color: '#FFC1D0', glow: 'rgba(255, 217, 227, 0.95)' },
  { id: 'passionate', label: '열정',   color: '#D32F2F', glow: 'rgba(255, 107, 107, 0.85)' },
  { id: 'tired',      label: '지침',   color: '#9E7BC4', glow: 'rgba(197, 174, 227, 0.9)' },
  { id: 'lonely',     label: '외로움', color: '#F0F0F5', glow: 'rgba(255, 255, 255, 0.95)' },
  { id: 'anxious',    label: '불안',   color: '#7B8FB0', glow: 'rgba(155, 175, 200, 0.85)' },
  { id: 'calm',       label: '평온',   color: '#A8D4C8', glow: 'rgba(168, 212, 200, 0.85)' },
  { id: 'excited',    label: '설렘',   color: '#FF8FAB', glow: 'rgba(255, 143, 171, 0.9)' },
];

export const moodById = (id) => MOODS.find((m) => m.id === id);

// ─── 색상 팔레트 ─────────────────────────────────────
// [기본색, 빛 색]
const C = {
  sunYellow:  ['#F5C518', 'rgba(255, 224, 102, 0.9)'],
  softYellow: ['#FFE99B', 'rgba(255, 233, 155, 0.9)'],
  gold:       ['#D4AF37', 'rgba(212, 175, 55, 0.85)'],
  orange:     ['#FFB347', 'rgba(255, 179, 71, 0.9)'],
  peach:      ['#FFCBA4', 'rgba(255, 203, 164, 0.9)'],
  coral:      ['#FFB7C5', 'rgba(255, 183, 197, 0.9)'],
  pink:       ['#FFC1D0', 'rgba(255, 217, 227, 0.9)'],
  hotPink:    ['#FF6B9D', 'rgba(255, 107, 157, 0.9)'],
  blush:      ['#FFDAE0', 'rgba(255, 218, 224, 0.9)'],
  magenta:    ['#FF477E', 'rgba(255, 71, 126, 0.9)'],
  ruby:       ['#E63946', 'rgba(230, 57, 70, 0.9)'],
  red:        ['#D32F2F', 'rgba(255, 107, 107, 0.9)'],
  deepRed:    ['#8C1A1A', 'rgba(140, 26, 26, 0.85)'],
  white:      ['#FFFFFF', 'rgba(255, 255, 255, 0.95)'],
  cream:      ['#F5F1E8', 'rgba(245, 241, 232, 0.9)'],
  pearl:      ['#F0E8DD', 'rgba(240, 232, 221, 0.85)'],
  lavender:   ['#C5AEE3', 'rgba(197, 174, 227, 0.9)'],
  lilac:      ['#C8A8D9', 'rgba(200, 168, 217, 0.9)'],
  purple:     ['#9E7BC4', 'rgba(158, 123, 196, 0.9)'],
  deepPurple: ['#7B68A6', 'rgba(123, 104, 166, 0.85)'],
  skyBlue:    ['#A8C8E0', 'rgba(168, 200, 224, 0.85)'],
  blue:       ['#8FAED9', 'rgba(143, 174, 217, 0.9)'],
  deepBlue:   ['#6B7FBF', 'rgba(107, 127, 191, 0.85)'],
  sage:       ['#A8D4C8', 'rgba(168, 212, 200, 0.85)'],
  mint:       ['#9BC8B5', 'rgba(155, 200, 181, 0.85)'],
};

// ─── 헬퍼: 꽃 객체를 짧게 만들기 ──────────────────────
// E = 이모지 꽃, S = 직접 그린 SVG 꽃
const E = (name, emoji, p) => ({ name, kind: 'emoji', emoji, color: p[0], glow: p[1] });
const S = (name, svgId, p) => ({ name, kind: 'svg',   svgId, color: p[0], glow: p[1] });

// ─── 감정별 꽃 풀 (각 20종 이상) ─────────────────────
// 같은 감정을 골라도 매번 다른 꽃이 랜덤으로 피어납니다.
export const FLOWER_POOLS = {
  // 🌞 기쁨 — 햇살처럼 환한 꽃들
  happy: [
    S('해바라기',   'sunflower', C.sunYellow),
    E('금잔화',     '🌻', C.orange),
    E('데이지',     '🌼', C.softYellow),
    E('노란 튤립',  '🌷', C.sunYellow),
    E('코스모스',   '🌸', C.coral),
    E('프리지아',   '🌼', C.softYellow),
    E('메리골드',   '🌻', C.orange),
    E('거베라',     '🌼', C.peach),
    E('백일홍',     '🌼', C.coral),
    E('수레국화',   '🌸', C.skyBlue),
    E('노란 장미',  '🌹', C.sunYellow),
    E('히아신스',   '🪻', C.lavender),
    E('민들레',     '🌼', C.sunYellow),
    E('팬지',       '🌸', C.purple),
    E('리시안셔스', '🌸', C.coral),
    E('칼렌듈라',   '🌻', C.orange),
    E('유채꽃',     '🌼', C.softYellow),
    E('금어초',     '🌼', C.peach),
    E('노랑 국화',  '🌼', C.sunYellow),
    E('스위트피',   '🌸', C.coral),
  ],

  // 🌱 희망 — 봄의 첫 숨처럼
  hopeful: [
    S('벚꽃',       'cherryblossom', C.pink),
    E('프리지아',   '🌼', C.softYellow),
    E('수선화',     '🌼', C.softYellow),
    E('흰 튤립',    '🌷', C.white),
    E('은방울꽃',   '🌼', C.white),
    E('목련',       '🌸', C.cream),
    E('복숭아꽃',   '🌸', C.coral),
    E('라넌큘러스', '🌸', C.peach),
    E('자스민',     '🌼', C.cream),
    E('안개꽃',     '🌸', C.white),
    E('아이리스',   '🪻', C.deepBlue),
    E('블루벨',     '🪻', C.deepBlue),
    E('스노우드롭', '🌼', C.white),
    E('라일락',     '🪻', C.lilac),
    E('클레마티스', '🌸', C.lavender),
    E('백합',       '🌼', C.white),
    E('매화',       '🌸', C.blush),
    E('흰 장미',    '🌹', C.white),
    E('작약',       '🌸', C.pink),
    E('아네모네',   '🌸', C.cream),
  ],

  // 🔥 열정 — 붉게 타오르는 마음
  passionate: [
    S('붉은 장미',     'rose', C.red),
    E('동백',          '🌺', C.deepRed),
    E('양귀비',        '🌺', C.red),
    E('붉은 튤립',     '🌷', C.red),
    E('칸나',          '🌺', C.orange),
    E('다알리아',      '🌺', C.ruby),
    E('글라디올러스', '🌷', C.magenta),
    E('진달래',        '🌸', C.hotPink),
    E('붉은 작약',     '🌺', C.ruby),
    E('제라늄',        '🌺', C.red),
    E('카네이션',      '🌸', C.hotPink),
    E('히비스커스',    '🌺', C.red),
    E('베고니아',      '🌸', C.ruby),
    E('아마릴리스',    '🌺', C.red),
    E('붉은 국화',     '🌼', C.ruby),
    E('부겐빌레아',   '🌸', C.magenta),
    E('카멜리아',      '🌺', C.deepRed),
    E('알스트로메리아','🌸', C.hotPink),
    E('로벨리아',      '🌸', C.deepPurple),
    E('석류꽃',        '🌺', C.orange),
  ],

  // 💜 지침 — 가만히 내려놓는 보랏빛 위로
  tired: [
    S('라벤더',         'lavender', C.purple),
    E('수국',           '🌸', C.skyBlue),
    E('카모마일',       '🌼', C.cream),
    E('안개꽃',         '🌸', C.white),
    E('블루벨',         '🪻', C.deepBlue),
    E('세이지꽃',       '🪻', C.lilac),
    E('아이비꽃',       '🌼', C.mint),
    E('보라 팬지',      '🌸', C.purple),
    E('은은한 백합',    '🌼', C.cream),
    E('유칼립투스꽃',  '🌼', C.sage),
    E('들국화',         '🌼', C.white),
    E('자운영',         '🌸', C.lavender),
    E('미모사',         '🌼', C.softYellow),
    E('히더',           '🪻', C.lilac),
    E('델피니움',       '🪻', C.deepBlue),
    E('플록스',         '🌸', C.lavender),
    E('수레국화',       '🌸', C.skyBlue),
    E('바이올렛',       '🌸', C.purple),
    E('로즈마리꽃',     '🪻', C.deepBlue),
    E('마가렛',         '🌼', C.white),
  ],

  // 🌙 외로움 — 달빛 아래 홀로 빛나는 꽃들
  lonely: [
    S('달맞이꽃',     'moonflower', C.white),
    E('물망초',       '🌸', C.skyBlue),
    E('보라 팬지',    '🌸', C.purple),
    E('흰 장미',      '🌹', C.white),
    E('자스민',       '🌼', C.cream),
    E('블루 아이리스','🪻', C.deepBlue),
    E('은방울꽃',     '🌼', C.white),
    E('라일락',       '🪻', C.lilac),
    E('아네모네',     '🌸', C.pearl),
    E('백합',         '🌼', C.white),
    E('코스모스',     '🌸', C.blush),
    E('수선화',       '🌼', C.cream),
    E('안개꽃',       '🌸', C.white),
    E('동백',         '🌺', C.cream),
    E('목련',         '🌸', C.cream),
    E('흰 작약',      '🌸', C.white),
    E('수국',         '🌸', C.skyBlue),
    E('데이지',       '🌼', C.white),
    E('클레마티스',   '🌸', C.lavender),
    E('스노우드롭',   '🌼', C.white),
  ],

  // 🌊 불안 — 어지러운 마음을 가라앉히는 꽃들
  anxious: [
    S('라벤더',        'lavender', C.lavender),
    E('카모마일',      '🌼', C.cream),
    E('백합',          '🌼', C.white),
    E('아이리스',      '🪻', C.deepBlue),
    E('수국',          '🌸', C.skyBlue),
    E('자스민',        '🌼', C.cream),
    E('목련',          '🌸', C.cream),
    E('히더',          '🪻', C.lilac),
    E('바이올렛',      '🌸', C.purple),
    E('블루벨',        '🪻', C.deepBlue),
    E('세이지꽃',      '🪻', C.lilac),
    E('흰 장미',       '🌹', C.white),
    E('로즈마리꽃',    '🪻', C.deepBlue),
    E('은방울꽃',      '🌼', C.white),
    E('안개꽃',        '🌸', C.white),
    E('델피니움',      '🪻', C.deepBlue),
    E('아네모네',      '🌸', C.lavender),
    E('라일락',        '🪻', C.lilac),
    E('유칼립투스꽃', '🌼', C.sage),
    E('수레국화',      '🌸', C.skyBlue),
  ],

  // 🕊️ 평온 — 잔잔한 호수 위에 뜬 꽃잎처럼
  calm: [
    E('연꽃',         '🪷', C.blush),
    E('흰 국화',      '🌼', C.white),
    E('목련',         '🌸', C.cream),
    E('하얀 데이지',  '🌼', C.white),
    E('올리브꽃',     '🌼', C.cream),
    E('백합',         '🌼', C.white),
    E('은방울꽃',     '🌼', C.white),
    E('수련',         '🪷', C.pink),
    S('라벤더',       'lavender', C.lavender),
    E('자스민',       '🌼', C.cream),
    E('카모마일',     '🌼', C.softYellow),
    E('스노우드롭',   '🌼', C.white),
    E('안개꽃',       '🌸', C.white),
    E('클로버꽃',     '🌼', C.cream),
    E('흰 장미',      '🌹', C.white),
    E('블루벨',       '🪻', C.skyBlue),
    E('세이지꽃',     '🪻', C.sage),
    E('미모사',       '🌼', C.softYellow),
    E('라일락',       '🪻', C.lilac),
    E('프리지아',     '🌼', C.softYellow),
  ],

  // 💖 설렘 — 분홍빛으로 부풀어 오르는 마음
  excited: [
    E('작약',         '🌸', C.hotPink),
    E('분홍 튤립',    '🌷', C.pink),
    E('프리지아',     '🌼', C.softYellow),
    E('복숭아꽃',     '🌸', C.peach),
    E('라넌큘러스',   '🌸', C.peach),
    S('벚꽃',         'cherryblossom', C.pink),
    E('핑크 장미',    '🌹', C.hotPink),
    E('스위트피',     '🌸', C.coral),
    E('거베라',       '🌼', C.hotPink),
    E('카네이션',     '🌸', C.pink),
    E('히아신스',     '🪻', C.pink),
    E('팬지',         '🌸', C.magenta),
    E('자스민',       '🌼', C.cream),
    E('블러쉬 로즈',  '🌹', C.blush),
    E('수국',         '🌸', C.pink),
    E('아네모네',     '🌸', C.magenta),
    E('블루밍 매화',  '🌸', C.blush),
    E('금어초',       '🌼', C.peach),
    E('클레마티스',   '🌸', C.lavender),
    E('리시안셔스',   '🌸', C.pink),
  ],
};

// ─── 풀에서 랜덤으로 꽃 한 송이 고르기 ────────────────
export const pickRandomFlower = (moodId) => {
  const pool = FLOWER_POOLS[moodId] || [];
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

// ─── 한국어 조사 헬퍼 ───────────────────────────────
// 받침이 있는지 보고 '로' 또는 '으로' 를 반환합니다.
// (ㄹ 받침은 예외적으로 '로'를 씁니다)
export const getInstrumentalParticle = (word) => {
  if (!word) return '로';
  const last = word.charAt(word.length - 1);
  const code = last.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return '로';
  const jongseong = (code - 0xAC00) % 28;
  // 0 = 받침 없음, 8 = ㄹ 받침
  return jongseong === 0 || jongseong === 8 ? '로' : '으로';
};

// ─── 정원 코드 생성 ──────────────────────────────────
export const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const newFlowerId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const storageKey = (room) => `garden:room:${room}`;

// ─── 공용 폰트와 배경 ────────────────────────────────
export const serif = "'Cormorant Garamond', 'Noto Serif KR', 'Times New Roman', Georgia, serif";
export const sans = "'Quicksand', 'Noto Serif KR', system-ui, -apple-system, sans-serif";

export const gardenGradient = `
  radial-gradient(ellipse at 20% 10%, rgba(45, 95, 75, 0.5) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 90%, rgba(30, 80, 55, 0.6) 0%, transparent 55%),
  linear-gradient(160deg, #0a2818 0%, #102e1f 35%, #143821 65%, #0d2418 100%)
`;
