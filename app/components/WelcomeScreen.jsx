'use client';

import { useState } from 'react';
import Fireflies from './Fireflies';
import { generateRoomCode, serif, sans, gardenGradient } from './constants';

// ─── 환영 화면 ───────────────────────────────────────
// 이름을 받고, 새 정원을 만들거나 친구의 코드로 입장합니다.
export default function WelcomeScreen({ onEnter }) {
  const [name, setName] = useState('');
  const [joinMode, setJoinMode] = useState('create'); // 'create' | 'join'
  const [joinInput, setJoinInput] = useState('');

  const canEnter =
    name.trim() && (joinMode === 'create' || joinInput.trim().length >= 4);

  const handleEnter = () => {
    if (!canEnter) return;
    const code =
      joinMode === 'create'
        ? generateRoomCode()
        : joinInput.trim().toUpperCase();
    onEnter(name.trim(), code);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: gardenGradient }}
    >
      <Fireflies count={28} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md" style={{ animation: 'fadeUp 1.2s ease-out' }}>
          {/* 헤더 */}
          <div className="text-center mb-10">
            <p
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: '0.95rem',
                letterSpacing: '0.3em',
                color: '#a8d4a8',
                marginBottom: '1rem',
              }}
            >
              어 서   오 세 요
            </p>
            <h1
              style={{
                fontFamily: serif,
                fontWeight: 300,
                fontSize: 'clamp(3rem, 8vw, 4.75rem)',
                color: '#f5f1e8',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '1.25rem',
              }}
            >
              Secret{' '}
              <span style={{ fontStyle: 'italic', color: '#e8d5a8' }}>Garden</span>
            </h1>
            <p
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: '#c8d8c0',
                opacity: 0.85,
              }}
            >
              우리의 하루가 꽃이 됩니다.
            </p>
          </div>

          {/* 입력 카드 */}
          <div className="rounded-2xl p-7 space-y-5" style={cardStyle}>
            <div>
              <label style={labelStyle}>이름을 알려주세요</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                maxLength={24}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = 'rgba(232, 213, 168, 0.5)')
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = 'rgba(168, 212, 168, 0.2)')
                }
              />
            </div>

            <div>
              <label style={labelStyle}>
                새 정원을 만들까요, 친구의 정원으로 갈까요?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setJoinMode('create')}
                  style={toggleBtn(joinMode === 'create')}
                >
                  새로 만들기
                </button>
                <button
                  onClick={() => setJoinMode('join')}
                  style={toggleBtn(joinMode === 'join')}
                >
                  코드로 입장
                </button>
              </div>
            </div>

            {joinMode === 'join' && (
              <div style={{ animation: 'fadeUp 0.5s ease-out' }}>
                <label style={labelStyle}>정원 코드</label>
                <input
                  type="text"
                  value={joinInput}
                  onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                  placeholder="예: PETAL3"
                  maxLength={8}
                  style={{
                    ...inputStyle,
                    letterSpacing: '0.25em',
                    textAlign: 'center',
                  }}
                />
              </div>
            )}

            <button
              onClick={handleEnter}
              disabled={!canEnter}
              style={primaryBtn(canEnter)}
            >
              정원에 들어가기
            </button>
          </div>

          <p
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              color: '#8aa890',
              opacity: 0.75,
            }}
          >
            사랑하는 이에게 꽃 한 송이를 남길 수 있는 조용한 곳.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── 스타일 ─────────────────────────────────────────
const cardStyle = {
  background: 'rgba(10, 30, 20, 0.55)',
  border: '1px solid rgba(168, 212, 168, 0.18)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow:
    '0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
};

const labelStyle = {
  display: 'block',
  fontFamily: sans,
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  color: '#a8c8a8',
  marginBottom: '0.6rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  background: 'rgba(0, 0, 0, 0.25)',
  border: '1px solid rgba(168, 212, 168, 0.2)',
  color: '#f5f1e8',
  fontFamily: serif,
  fontSize: '1.05rem',
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const toggleBtn = (active) => ({
  padding: '0.75rem 0.5rem',
  borderRadius: '10px',
  border: `1px solid ${active ? 'rgba(232, 213, 168, 0.45)' : 'rgba(168, 212, 168, 0.18)'}`,
  background: active ? 'rgba(232, 213, 168, 0.18)' : 'rgba(255,255,255,0.04)',
  color: active ? '#f5f1e8' : '#a8c8a8',
  fontFamily: serif,
  fontSize: '0.95rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
});

const primaryBtn = (enabled) => ({
  width: '100%',
  padding: '0.95rem 1rem',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #e8d5a8 0%, #d4b87a 100%)',
  color: '#1a3a25',
  fontFamily: serif,
  fontSize: '1.05rem',
  fontWeight: 500,
  letterSpacing: '0.05em',
  border: 'none',
  cursor: enabled ? 'pointer' : 'not-allowed',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 24px -8px rgba(232, 213, 168, 0.5)',
  opacity: enabled ? 1 : 0.4,
});
