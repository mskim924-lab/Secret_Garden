'use client';

import { useState } from 'react';
import Fireflies from './Fireflies';
import { RenderFlower, Bud } from './Flowers';
import {
  MOODS,
  moodById,
  pickRandomFlower,
  getInstrumentalParticle,
  serif,
  sans,
  gardenGradient,
} from './constants';

// ─── 정원 화면 ───────────────────────────────────────
// 정원의 꽃들을 보여주고, 감정을 선택해서 새 꽃을 피웁니다.
// 꽃 피우기 흐름:
//   idle  →  budding (1초)  →  revealing  →  idle
export default function GardenScreen({ name, roomCode, flowers, onBloom }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState('');
  const [bloomPhase, setBloomPhase] = useState('idle'); // 'idle' | 'budding' | 'revealing'
  const [pendingBloom, setPendingBloom] = useState(null);
  const [justBloomedId, setJustBloomedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [copyState, setCopyState] = useState('idle');

  const canBloom =
    selectedMood && message.trim() && bloomPhase === 'idle';

  // ─── 꽃 피우기 시작 ─────────────────────────────────
  const handleBloom = () => {
    if (!canBloom) return;

    // 풀에서 랜덤하게 꽃 한 송이 선택
    const chosenFlower = pickRandomFlower(selectedMood);
    if (!chosenFlower) return;

    // 1단계: 꽃망울 단계 (1초)
    setBloomPhase('budding');
    setPendingBloom({
      mood: selectedMood,
      message: message.trim(),
      flower: chosenFlower,
    });

    // 1초 후 reveal 단계로
    setTimeout(() => {
      setBloomPhase('revealing');
    }, 1100);
  };

  // ─── 사용자가 reveal을 확인하면 실제 저장 ──────────
  const completeBloom = async () => {
    if (!pendingBloom) return;
    const newId = await onBloom(
      pendingBloom.mood,
      pendingBloom.message,
      pendingBloom.flower
    );
    if (newId) {
      setJustBloomedId(newId);
      setTimeout(() => setJustBloomedId(null), 2500);
    }
    setBloomPhase('idle');
    setPendingBloom(null);
    setMessage('');
    setSelectedMood(null);
  };

  // ─── 정원 코드 복사 ─────────────────────────────────
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1800);
    } catch (e) {
      // 권한 없음 등 - 조용히 무시
    }
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: gardenGradient }}
    >
      <Fireflies count={32} />

      {/* 바닥 부근 부드러운 빛 */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '45%',
          background:
            'radial-gradient(ellipse at center bottom, rgba(168, 212, 168, 0.1) 0%, transparent 65%)',
        }}
      />

      {/* 상단 헤더 */}
      <div className="relative z-20 px-5 sm:px-8 pt-6 sm:pt-8 flex items-start justify-between gap-3">
        <div>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 4vw, 2.25rem)',
              color: '#f5f1e8',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            Secret{' '}
            <span style={{ fontStyle: 'italic', color: '#e8d5a8' }}>Garden</span>
          </h1>
          <p
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: '#a8c8a8',
              marginTop: '0.35rem',
              opacity: 0.85,
            }}
          >
            우리의 하루가 꽃이 됩니다.
          </p>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-2"
          style={chipStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(232, 213, 168, 0.5)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(168, 212, 168, 0.25)')
          }
          title="정원 코드 복사"
        >
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: '#a8c8a8',
              fontFamily: sans,
            }}
          >
            {copyState === 'copied' ? '복사됨' : '정원'}
          </span>
          <span
            style={{
              fontFamily: serif,
              letterSpacing: '0.2em',
              color: '#e8d5a8',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {roomCode}
          </span>
        </button>
      </div>

      {/* 정원 캔버스 */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-2 sm:px-4 mt-4"
        style={{ minHeight: '52vh' }}
      >
        {flowers.length === 0 ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: '40vh' }}
          >
            <div
              className="text-center max-w-sm px-6"
              style={{ animation: 'fadeUp 1.2s ease-out 0.3s both' }}
            >
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: '#c8d8c0',
                  opacity: 0.85,
                  lineHeight: 1.8,
                }}
              >
                아직 정원이 고요해요.
                <br />
                아래에서 첫 꽃을 피워보세요.
                <br />
                그리고 사랑하는 이에게{' '}
                <span style={{ color: '#e8d5a8' }}>{roomCode}</span> 를
                알려주세요.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="relative w-full"
            style={{ height: '52vh', minHeight: '340px' }}
          >
            {flowers.map((f, i) => {
              const m = moodById(f.mood);
              if (!m) return null;
              const isHovered = hoveredId === f.id;
              const isNew = justBloomedId === f.id;
              // 뒤쪽 꽃은 약간 더 작고 옅게 — 자연스러운 깊이감
              const depthDim = 0.7 + (1 - f.yOffset / 40) * 0.3;
              return (
                <div
                  key={f.id}
                  onMouseEnter={() => setHoveredId(f.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() =>
                    setHoveredId(hoveredId === f.id ? null : f.id)
                  }
                  style={{
                    position: 'absolute',
                    left: `${f.xPercent}%`,
                    bottom: `${f.yOffset}%`,
                    transform: `translateX(-50%) scale(${f.scale})`,
                    width: 'clamp(70px, 12vw, 130px)',
                    height: 'clamp(120px, 20vw, 220px)',
                    cursor: 'pointer',
                    animation: isNew
                      ? 'bloomIn 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      : `sway ${4 + (i % 5) * 0.5}s ease-in-out ${
                          i * 0.15
                        }s infinite alternate, fadeUp 1s ease-out`,
                    transformOrigin: 'bottom center',
                    zIndex: isHovered ? 50 : Math.floor(f.yOffset),
                    filter: isHovered
                      ? 'brightness(1.2)'
                      : `brightness(${depthDim})`,
                    transition: 'filter 0.3s ease',
                  }}
                >
                  <RenderFlower flower={f.flower} fallbackMood={f.mood} />

                  {isHovered && (
                    <div style={tooltipStyle}>
                      <p
                        style={{
                          fontFamily: serif,
                          fontStyle: 'italic',
                          color: '#e8d5a8',
                          fontSize: '0.88rem',
                          marginBottom: '0.4rem',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {f.name}님 · {m.label}
                        {f.flower?.name ? ` · ${f.flower.name}` : ''}
                      </p>
                      <p
                        style={{
                          fontFamily: serif,
                          color: '#f5f1e8',
                          fontSize: '0.98rem',
                          lineHeight: 1.5,
                        }}
                      >
                        “{f.message}”
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 꽃 피우기 패널 */}
      <div className="relative z-20 px-4 sm:px-8 pb-6 pt-6 mt-4">
        <div
          className="mx-auto max-w-3xl rounded-2xl p-5 sm:p-6"
          style={panelStyle}
        >
          <div className="mb-4">
            <p
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                color: '#a8c8a8',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
              }}
            >
              {name}님, 안녕하세요
            </p>
            <h2
              style={{
                fontFamily: serif,
                color: '#f5f1e8',
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                marginTop: '0.25rem',
                fontWeight: 300,
              }}
            >
              오늘의 마음은{' '}
              <span style={{ fontStyle: 'italic', color: '#e8d5a8' }}>
                어떤가요?
              </span>
            </h2>
          </div>

          {/* 감정 선택 (8개) - 어떤 꽃이 필지는 비밀입니다 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {MOODS.map((m) => {
              const active = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  style={{
                    padding: '0.8rem 0.5rem',
                    borderRadius: '12px',
                    background: active
                      ? `linear-gradient(135deg, ${m.color}22 0%, ${m.color}11 100%)`
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${
                      active ? m.color + '70' : 'rgba(168, 212, 168, 0.15)'
                    }`,
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    transform: active ? 'translateY(-2px)' : 'none',
                    boxShadow: active ? `0 8px 20px -8px ${m.color}88` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      style={{
                        width: '11px',
                        height: '11px',
                        borderRadius: '999px',
                        background: m.color,
                        boxShadow: `0 0 14px ${m.glow}`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: serif,
                        color: '#f5f1e8',
                        fontSize: '1.02rem',
                        fontWeight: 400,
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 메시지 입력 */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="정원에 작은 메모를 남겨주세요…"
            maxLength={140}
            rows={2}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(168, 212, 168, 0.2)',
              color: '#f5f1e8',
              fontFamily: serif,
              fontSize: '1rem',
              resize: 'none',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              lineHeight: 1.6,
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = 'rgba(232, 213, 168, 0.5)')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = 'rgba(168, 212, 168, 0.2)')
            }
          />

          <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
            <span
              style={{
                fontFamily: sans,
                fontSize: '0.78rem',
                color: '#8aa890',
                letterSpacing: '0.05em',
              }}
            >
              {message.length} / 140
            </span>
            <button
              onClick={handleBloom}
              disabled={!canBloom}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #e8d5a8 0%, #d4b87a 100%)',
                color: '#1a3a25',
                fontFamily: serif,
                fontSize: '1.05rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                border: 'none',
                cursor: canBloom ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px -8px rgba(232, 213, 168, 0.5)',
                opacity: canBloom ? 1 : 0.4,
              }}
            >
              ✿  꽃 피우기
            </button>
          </div>
        </div>
      </div>

      {/* ─── 꽃 피우기 reveal 모달 ──────────────────── */}
      {bloomPhase !== 'idle' && (
        <BloomRevealOverlay
          phase={bloomPhase}
          pendingBloom={pendingBloom}
          onComplete={completeBloom}
        />
      )}
    </div>
  );
}

// ─── reveal 오버레이 ───────────────────────────────────
function BloomRevealOverlay({ phase, pendingBloom, onComplete }) {
  const mood = pendingBloom ? moodById(pendingBloom.mood) : null;
  const flower = pendingBloom?.flower;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: 'rgba(8, 24, 16, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'overlayFade 0.5s ease-out',
      }}
    >
      {phase === 'budding' && (
        <div className="text-center">
          <div
            style={{
              width: 'min(40vw, 180px)',
              height: 'min(60vw, 260px)',
              margin: '0 auto',
              animation: 'budBreathe 1.4s ease-in-out infinite',
            }}
          >
            <Bud />
          </div>
          <p
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              color: '#e8d5a8',
              fontSize: '1.2rem',
              marginTop: '1.5rem',
              letterSpacing: '0.08em',
              animation: 'shimmerText 1.5s ease-in-out infinite',
            }}
          >
            꽃망울이 열리는 중…
          </p>
        </div>
      )}

      {phase === 'revealing' && pendingBloom && (
        <div className="text-center max-w-md w-full flex flex-col items-center">
          <div
            style={{
              width: 'min(55vw, 220px)',
              height: 'min(75vw, 320px)',
              animation: 'revealBloom 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <RenderFlower flower={flower} />
          </div>

          <p
            style={{
              fontFamily: serif,
              fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
              color: '#f5f1e8',
              marginTop: '1.75rem',
              lineHeight: 1.7,
              animation: 'textRise 0.8s ease-out 0.7s both',
            }}
          >
            오늘 당신의{' '}
            <span style={{ color: '#a8d4a8' }}>{mood?.label}</span>은{' '}
            <span style={{ color: '#e8d5a8', fontStyle: 'italic' }}>
              {flower?.name}
            </span>
            {getInstrumentalParticle(flower?.name || '')} 피어났어요.
          </p>

          <button
            onClick={onComplete}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.85rem',
              borderRadius: '999px',
              background: 'transparent',
              border: '1px solid rgba(232, 213, 168, 0.6)',
              color: '#e8d5a8',
              fontFamily: serif,
              fontSize: '0.98rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              animation: 'textRise 0.8s ease-out 1.3s both',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(232, 213, 168, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(232, 213, 168, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(232, 213, 168, 0.6)';
            }}
          >
            정원에서 만나기
          </button>
        </div>
      )}
    </div>
  );
}

// ─── 스타일 ─────────────────────────────────────────
const chipStyle = {
  padding: '0.6rem 1rem',
  borderRadius: '999px',
  background: 'rgba(10, 30, 20, 0.5)',
  border: '1px solid rgba(168, 212, 168, 0.25)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const tooltipStyle = {
  position: 'absolute',
  bottom: 'calc(100% + 12px)',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(8, 24, 16, 0.92)',
  border: '1px solid rgba(232, 213, 168, 0.35)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '14px',
  padding: '0.85rem 1.1rem',
  minWidth: '220px',
  maxWidth: '280px',
  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
  animation: 'tooltipIn 0.3s ease-out',
  pointerEvents: 'none',
};

const panelStyle = {
  background: 'rgba(10, 30, 20, 0.6)',
  border: '1px solid rgba(168, 212, 168, 0.2)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.6)',
};
