import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Glow, Vignette} from './Overlays';

/** Bối cảnh vector có lớp + ánh sáng. Thêm set mới vào SETS. Nếu có ảnh nền AI, dùng `img:<file>` trong JSON. */

const Skyline: React.FC<{color?: string; lit?: string; seed?: number; top?: number}> = ({color = '#141a35', lit = '#ffd77a', seed = 3, top = 0.35}) => {
  const frame = useCurrentFrame();
  const b = Array.from({length: 16}, (_, i) => ({w: 70 + ((i * 37 + seed * 11) % 70), h: 0.2 + ((i * 53 + seed) % 40) / 100}));
  let x = -20;
  return (
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'absolute'}}>
      {b.map((d, i) => {
        const bx = x; x += d.w + 14;
        const h = d.h * 1080, by = top * 1080 + (0.45 * 1080 - h);
        return (
          <g key={i}>
            <rect x={bx} y={by} width={d.w} height={1080 - by} fill={color} />
            {Array.from({length: Math.floor(h / 34)}).map((_, r) =>
              Array.from({length: Math.floor(d.w / 22)}).map((__, c) => {
                const on = ((r * 7 + c * 13 + i * 5 + Math.floor(frame / 90)) % 5) < 2;
                return on ? <rect key={`${r}-${c}`} x={bx + 6 + c * 22} y={by + 10 + r * 34} width={10} height={16} fill={lit} opacity={0.85} /> : null;
              }),
            )}
          </g>
        );
      })}
    </svg>
  );
};

const Floor: React.FC<{color: string; top?: number}> = ({color, top = 0.78}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: `${top * 100}%`, bottom: 0, background: color}} />
);

export const SETS: Record<string, React.FC> = {
  night_city: () => (
    <AbsoluteFill style={{background: `linear-gradient(${C.night}, #2a2150)`}}>
      <div style={{position: 'absolute', right: 220, top: 110, width: 70, height: 70, borderRadius: '50%', background: '#fff8d8', boxShadow: '0 0 60px #fff8d8'}} />
      <Skyline />
      <Floor color="#0a0c18" top={0.84} />
      <Vignette />
    </AbsoluteFill>
  ),
  rooftop_sunset: () => (
    <AbsoluteFill style={{background: 'linear-gradient(#3b2a6b 0%, #c4588a 55%, #ffb36b 80%)'}}>
      <Skyline color="#2a2048" lit="#ffe39a" seed={7} top={0.42} />
      <Floor color="#1c1530" top={0.86} />
      <Vignette strength={0.5} />
    </AbsoluteFill>
  ),
  fancy_dinner: () => (
    <AbsoluteFill style={{background: 'linear-gradient(#3a0f12, #1a0607)'}}>
      <div style={{position: 'absolute', inset: '8% 10% 40% 10%', background: '#0e1430', border: '14px solid #4a2412'}}><Skyline seed={9} top={0.1} /></div>
      <div style={{position: 'absolute', left: '3%', top: 0, width: '10%', bottom: '20%', background: 'linear-gradient(90deg,#8d0f18,#c8202c,#8d0f18)'}} />
      <div style={{position: 'absolute', right: '3%', top: 0, width: '10%', bottom: '20%', background: 'linear-gradient(90deg,#8d0f18,#c8202c,#8d0f18)'}} />
      <Glow x={0.25} y={0.3} r={120} flicker />
      <Glow x={0.75} y={0.3} r={120} flicker />
      <Floor color="#24090b" top={0.8} />
      <Vignette strength={0.8} />
    </AbsoluteFill>
  ),
  office_day: () => (
    <AbsoluteFill style={{background: 'linear-gradient(#e8eef2, #cfd9df)'}}>
      <div style={{position: 'absolute', inset: '10% 8% 35% 8%', background: 'linear-gradient(#bfe3ff,#f2f8ff)', border: '10px solid #fff', boxShadow: 'inset 0 0 0 4px #9fb3c2'}} />
      <div style={{position: 'absolute', left: '62%', top: '16%', width: '24%', height: '30%', background: '#fff', border: '6px solid #888'}} />
      <Floor color="#b9c3c9" top={0.8} />
      <Vignette strength={0.35} />
    </AbsoluteFill>
  ),
  dark_desk: () => (
    <AbsoluteFill style={{background: '#0b0d16'}}>
      <div style={{position: 'absolute', inset: '6% 20% 45% 20%', background: '#101a36', border: '10px solid #1b1b24'}}><Skyline seed={2} top={0.05} /></div>
      <div style={{position: 'absolute', left: '10%', right: '10%', top: '62%', bottom: 0, background: 'linear-gradient(#1f4d35,#11291c)', borderTop: '10px solid #4a2c18'}} />
      <Glow x={0.3} y={0.62} r={300} color="#ffd27a" />
      <Vignette strength={0.85} />
    </AbsoluteFill>
  ),
  paper_map: () => (
    <AbsoluteFill style={{background: '#a9d4ea'}}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
        <path d="M0 0 L760 0 Q700 220 820 380 Q760 560 900 760 Q780 900 820 1080 L0 1080Z" fill={C.paper} stroke="#c9b98f" strokeWidth={4} />
        <path d="M1180 520 Q1230 470 1260 560 Q1250 680 1200 700 Q1160 620 1180 520Z" fill={C.paper} stroke="#c9b98f" strokeWidth={4} />
      </svg>
      <Vignette strength={0.3} />
    </AbsoluteFill>
  ),
  void_green: () => (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 60%, #0f2a14, #020403 70%)'}} />
  ),
};

export const SetView: React.FC<{name: string}> = ({name}) => {
  if (name.startsWith('img:')) return <AbsoluteFill><Img src={staticFile(name.slice(4))} style={{width: '100%', height: '100%', objectFit: 'cover'}} /><Vignette /></AbsoluteFill>;
  const S = SETS[name] ?? SETS.night_city;
  return <S />;
};
