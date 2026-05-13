'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GardenScreen from './components/GardenScreen';
import { storageKey, newFlowerId } from './components/constants';

// ─── 메인 페이지 ─────────────────────────────────────
// 환영 화면 ↔ 정원 화면 사이의 상태를 관리하고,
// localStorage에 꽃 데이터를 저장합니다.
export default function Page() {
  const [stage, setStage] = useState('welcome'); // 'welcome' | 'garden'
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [flowers, setFlowers] = useState([]);
  const pollRef = useRef(null);

  // ─── 정원 불러오기 ─────────────────────────────────
  const loadFlowers = useCallback((room) => {
    if (!room || typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(storageKey(room));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFlowers(parsed);
      } else {
        setFlowers([]);
      }
    } catch (e) {
      setFlowers([]);
    }
  }, []);

  useEffect(() => {
    if (stage !== 'garden' || !roomCode) return;
    loadFlowers(roomCode);

    // 같은 브라우저의 다른 탭에서 꽃이 추가되면 반영
    const handler = (e) => {
      if (e.key === storageKey(roomCode)) loadFlowers(roomCode);
    };
    window.addEventListener('storage', handler);

    // 안전을 위한 폴링 (5초마다)
    pollRef.current = setInterval(() => loadFlowers(roomCode), 5000);

    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(pollRef.current);
    };
  }, [stage, roomCode, loadFlowers]);

  // ─── 환영 화면 → 정원 화면 ─────────────────────────
  const enterGarden = (userName, code) => {
    setName(userName);
    setRoomCode(code);
    setStage('garden');
  };

  // ─── 꽃 피우기 ─────────────────────────────────────
  // GardenScreen에서 이미 고른 꽃 정보(chosenFlower)를 받아 저장합니다.
  // 새 꽃의 id를 반환합니다.
  const handleBloom = async (moodId, message, chosenFlower) => {
    if (!moodId || !message.trim() || !chosenFlower) return null;

    // 정원 위의 자연스러운 위치
    // x: 좌우 6%~94%, y: 바닥에서 0~40% 위, scale: 0.8~1.2
    const xPercent = 6 + Math.random() * 88;
    const yOffset = Math.random() * 40;
    const scale = 0.8 + Math.random() * 0.4;

    const newFlower = {
      id: newFlowerId(),
      name: name.trim(),
      mood: moodId,
      message: message.trim(),
      timestamp: Date.now(),
      xPercent,
      yOffset,
      scale,
      flower: chosenFlower, // 어떤 종류의 꽃이 피었는지 저장
    };

    // 다른 탭에서 추가된 꽃을 잃지 않도록 최신본을 먼저 읽어옵니다
    let latest = [];
    try {
      const stored = localStorage.getItem(storageKey(roomCode));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) latest = parsed;
      }
    } catch (e) {
      // 비어있는 정원
    }

    const updated = [...latest, newFlower];
    localStorage.setItem(storageKey(roomCode), JSON.stringify(updated));
    setFlowers(updated);

    return newFlower.id;
  };

  // ─── 화면 분기 ─────────────────────────────────────
  if (stage === 'welcome') {
    return <WelcomeScreen onEnter={enterGarden} />;
  }

  return (
    <GardenScreen
      name={name}
      roomCode={roomCode}
      flowers={flowers}
      onBloom={handleBloom}
    />
  );
}
