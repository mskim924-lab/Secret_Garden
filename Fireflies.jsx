'use client';

import { useState, useEffect } from 'react';

// ─── 정원 위를 떠다니는 반딧불 ──────────────────────
// useEffect 안에서만 위치를 정해서 SSR/하이드레이션
// 불일치를 방지합니다.
export default function Fireflies({ count = 22 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 8 + Math.random() * 14,
        delay: Math.random() * 10,
        drift: Math.random() * 30 - 15,
        twinkleDur: 2 + Math.random() * 3,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              'radial-gradient(circle, rgba(255,236,170,0.95) 0%, rgba(255,236,170,0.3) 50%, transparent 100%)',
            boxShadow: '0 0 8px rgba(255, 236, 170, 0.7)',
            animation: `firefly ${p.duration}s ease-in-out ${p.delay}s infinite, twinkle ${p.twinkleDur}s ease-in-out infinite`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
