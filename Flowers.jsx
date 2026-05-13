// ─── 다섯 가지 직접 그린 SVG 꽃 ──────────────────────
// 100×170 viewBox 안에서 줄기와 꽃을 그립니다.

export const Sunflower = ({ glow }) => (
  <svg viewBox="0 0 100 170" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 168 Q46 130 50 80" stroke="#2d5f3a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M50 120 Q35 110 28 100" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="26" cy="98" rx="10" ry="4" fill="#3a6e44" transform="rotate(-35 26 98)" />
    <g style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="38" rx="6.5" ry="17" fill="#F5C518"
                 transform={`rotate(${i * 30} 50 58)`} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={`b-${i}`} cx="50" cy="46" rx="4.5" ry="11" fill="#FFD966"
                 transform={`rotate(${i * 30 + 15} 50 58)`} />
      ))}
    </g>
    <circle cx="50" cy="58" r="11" fill="#5c3a1e" />
    <circle cx="50" cy="58" r="8" fill="#4a2f18" />
    <circle cx="48" cy="56" r="2" fill="#8a5a2a" opacity="0.6" />
  </svg>
);

export const CherryBlossom = ({ glow }) => (
  <svg viewBox="0 0 100 170" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 168 Q52 120 48 70" stroke="#3a4d2f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M50 130 Q62 122 70 115" stroke="#3a4d2f" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M48 100 Q34 92 28 80" stroke="#3a4d2f" strokeWidth="2" fill="none" strokeLinecap="round" />
    <g style={{ filter: `drop-shadow(0 0 7px ${glow})` }}>
      {[
        { cx: 50, cy: 50, s: 1 },
        { cx: 30, cy: 75, s: 0.75 },
        { cx: 72, cy: 110, s: 0.8 },
        { cx: 68, cy: 60, s: 0.85 },
        { cx: 35, cy: 105, s: 0.7 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.cx} ${f.cy}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((deg, j) => (
            <ellipse key={j} cx="0" cy="-10" rx="6" ry="9" fill="#FFC1D0" transform={`rotate(${deg})`} />
          ))}
          {[0, 72, 144, 216, 288].map((deg, j) => (
            <ellipse key={`i-${j}`} cx="0" cy="-7" rx="3" ry="5" fill="#FFD9E3" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="2.5" fill="#E8909F" />
        </g>
      ))}
    </g>
  </svg>
);

export const Rose = ({ glow }) => (
  <svg viewBox="0 0 100 170" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 168 Q48 130 50 75" stroke="#2d5f3a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M50 125 Q66 118 72 108" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="74" cy="106" rx="11" ry="5" fill="#3a6e44" transform="rotate(30 74 106)" />
    <path d="M50 100 Q32 94 26 84" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="24" cy="82" rx="11" ry="5" fill="#3a6e44" transform="rotate(-30 24 82)" />
    <g style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i} cx="50" cy="42" rx="10" ry="16" fill="#8C1A1A"
                 transform={`rotate(${deg} 50 60)`} opacity="0.9" />
      ))}
      {[30, 90, 150, 210, 270, 330].map((deg, i) => (
        <ellipse key={`m-${i}`} cx="50" cy="48" rx="8" ry="13" fill="#C0392B"
                 transform={`rotate(${deg} 50 60)`} />
      ))}
      {[0, 90, 180, 270].map((deg, i) => (
        <ellipse key={`o-${i}`} cx="50" cy="53" rx="6" ry="10" fill="#D32F2F"
                 transform={`rotate(${deg} 50 60)`} />
      ))}
      <circle cx="50" cy="60" r="6" fill="#7A1A1A" />
      <circle cx="50" cy="60" r="3" fill="#4A0E0E" />
    </g>
  </svg>
);

export const Lavender = ({ glow }) => (
  <svg viewBox="0 0 100 170" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 168 Q49 130 50 60" stroke="#3a5e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M42 168 Q43 135 44 80" stroke="#3a5e3a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    <path d="M58 168 Q57 135 56 85" stroke="#3a5e3a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    <g style={{ filter: `drop-shadow(0 0 6px ${glow})` }}>
      {[60, 70, 80, 90, 100, 110].map((y, i) => (
        <g key={i}>
          <ellipse cx="50" cy={y} rx="5.5" ry="4" fill="#9E7BC4" />
          <ellipse cx="50" cy={y} rx="3.5" ry="2.5" fill="#C5AEE3" opacity="0.8" />
        </g>
      ))}
      {[85, 95, 105, 115, 125].map((y, i) => (
        <g key={`l-${i}`}>
          <ellipse cx="44" cy={y} rx="4" ry="3" fill="#9E7BC4" opacity="0.85" />
          <ellipse cx="44" cy={y} rx="2.5" ry="1.8" fill="#C5AEE3" opacity="0.7" />
        </g>
      ))}
      {[90, 100, 110, 120, 130].map((y, i) => (
        <g key={`r-${i}`}>
          <ellipse cx="56" cy={y} rx="4" ry="3" fill="#9E7BC4" opacity="0.85" />
          <ellipse cx="56" cy={y} rx="2.5" ry="1.8" fill="#C5AEE3" opacity="0.7" />
        </g>
      ))}
    </g>
  </svg>
);

export const Moonflower = ({ glow }) => (
  <svg viewBox="0 0 100 170" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 168 Q52 128 50 75" stroke="#2d5f3a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <path d="M50 120 Q34 112 26 100" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="24" cy="98" rx="11" ry="4.5" fill="#3a6e44" transform="rotate(-35 24 98)" />
    <g style={{ filter: `drop-shadow(0 0 14px ${glow})` }}>
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={i} cx="50" cy="38" rx="12" ry="22" fill="#F0F0F5"
                 transform={`rotate(${deg} 50 58)`} />
      ))}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={`i-${i}`} cx="50" cy="44" rx="8" ry="16" fill="#FFFFFF"
                 transform={`rotate(${deg} 50 58)`} />
      ))}
      <circle cx="50" cy="58" r="9" fill="#F5F5FA" />
      <circle cx="50" cy="58" r="5" fill="#E8E8F5" />
      <circle cx="48" cy="56" r="2.5" fill="#C5C5D5" opacity="0.5" />
    </g>
  </svg>
);

// ─── 이모지 꽃 ───────────────────────────────────────
// 줄기는 SVG로 그리고, 꽃 부분은 큰 이모지를 빛 효과와 함께 띄웁니다.
export const EmojiFlower = ({ emoji, glow }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg viewBox="0 0 100 170" width="100%" height="100%"
         style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d="M50 168 Q48 130 50 75" stroke="#2d5f3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M50 115 Q35 108 28 95" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="93" rx="9" ry="4" fill="#3a6e44" transform="rotate(-35 26 93)" />
    </svg>
    <div
      style={{
        position: 'absolute',
        top: '-2%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(2.4rem, 9vw, 4.4rem)',
        lineHeight: 1,
        filter: `drop-shadow(0 0 10px ${glow}) drop-shadow(0 0 24px ${glow})`,
      }}
    >
      {emoji}
    </div>
  </div>
);

// ─── 꽃망울 (피기 직전의 봉오리) ─────────────────────
// "꽃망울이 열리는 중..." 단계에서 보여줍니다.
export const Bud = () => (
  <svg viewBox="0 0 100 180" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <path d="M50 178 Q48 140 50 80" stroke="#2d5f3a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M50 130 Q35 122 28 110" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="26" cy="108" rx="11" ry="4.5" fill="#3a6e44" transform="rotate(-35 26 108)" />
    <path d="M50 140 Q65 130 72 118" stroke="#3a6e44" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="74" cy="116" rx="11" ry="4.5" fill="#3a6e44" transform="rotate(30 74 116)" />
    <g style={{ filter: 'drop-shadow(0 0 16px rgba(232, 213, 168, 0.65))' }}>
      {/* 외곽 봉오리 */}
      <path d="M50 40
               Q33 40 33 65
               Q33 82 50 88
               Q67 82 67 65
               Q67 40 50 40 Z"
            fill="#3a6e44" />
      {/* 안쪽 봉오리 */}
      <path d="M50 44
               Q39 44 39 65
               Q39 78 50 82
               Q61 78 61 65
               Q61 44 50 44 Z"
            fill="#5c9056" />
      {/* 끝부분의 색이 살짝 비치는 부분 */}
      <path d="M50 48
               Q44 48 44 62
               Q44 70 50 73
               Q56 70 56 62
               Q56 48 50 48 Z"
            fill="#7ab070" opacity="0.9" />
      {/* 살짝 보이는 꽃잎 색 힌트 */}
      <ellipse cx="50" cy="54" rx="3.5" ry="7" fill="#e8d5a8" opacity="0.55" />
    </g>
  </svg>
);

// ─── 꽃 정보에 따라 올바른 컴포넌트를 골라줍니다 ─────
// 옛 데이터(flower 필드가 없는 경우)는 mood id로 폴백합니다.
export function RenderFlower({ flower, fallbackMood }) {
  // 폴백: 예전 데이터는 mood만 있을 수 있음
  if (!flower && fallbackMood) {
    const legacyMap = {
      happy: 'sunflower',
      hopeful: 'cherryblossom',
      passionate: 'rose',
      tired: 'lavender',
      lonely: 'moonflower',
    };
    const svgId = legacyMap[fallbackMood];
    if (svgId) return <SvgById id={svgId} glow="rgba(255, 255, 255, 0.6)" />;
    return null;
  }

  if (!flower) return null;

  if (flower.kind === 'svg') {
    return <SvgById id={flower.svgId} glow={flower.glow} />;
  }
  if (flower.kind === 'emoji') {
    return <EmojiFlower emoji={flower.emoji} glow={flower.glow} />;
  }
  return null;
}

function SvgById({ id, glow }) {
  switch (id) {
    case 'sunflower':     return <Sunflower glow={glow} />;
    case 'cherryblossom': return <CherryBlossom glow={glow} />;
    case 'rose':          return <Rose glow={glow} />;
    case 'lavender':      return <Lavender glow={glow} />;
    case 'moonflower':    return <Moonflower glow={glow} />;
    default:              return null;
  }
}
