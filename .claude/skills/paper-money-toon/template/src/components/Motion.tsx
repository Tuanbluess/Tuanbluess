import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

/** Kiểu vào shot. Đổi luân phiên — không dùng một kiểu 3 lần liền. */
export type Transition = 'cut' | 'whip' | 'zoomIn' | 'zoomOut' | 'flash' | 'slideUp' | 'slideLeft' | 'iris' | 'glitch' | 'spin' | 'drop';

export const TransitionIn: React.FC<{type?: Transition; children: React.ReactNode}> = ({type = 'cut', children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 16, stiffness: 160}});
  const e = (a: number, b: number, d = 8) => interpolate(frame, [0, d], [a, b], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  let style: React.CSSProperties = {};
  let overlay: React.ReactNode = null;
  switch (type) {
    case 'whip': style = {transform: `translateX(${e(1400, 0)}px)`, filter: `blur(${e(24, 0)}px)`}; break;
    case 'zoomIn': style = {transform: `scale(${e(2.2, 1, 10)})`, filter: `blur(${e(10, 0)}px)`}; break;
    case 'zoomOut': style = {transform: `scale(${e(0.6, 1, 10)})`}; break;
    case 'slideUp': style = {transform: `translateY(${(1 - p) * 1080}px)`}; break;
    case 'slideLeft': style = {transform: `translateX(${(1 - p) * 1920}px)`}; break;
    case 'spin': style = {transform: `rotate(${(1 - p) * -25}deg) scale(${0.7 + p * 0.3})`}; break;
    case 'drop': style = {transform: `translateY(${(1 - p) * -1080}px)`}; break;
    case 'iris': style = {clipPath: `circle(${e(0, 120, 12)}% at 50% 50%)`}; break;
    case 'flash': overlay = <AbsoluteFill style={{background: '#fff', opacity: e(1, 0, 6)}} />; break;
    case 'glitch': {
      const g = frame < 6;
      style = g ? {transform: `translateX(${(random(`g${frame}`) - 0.5) * 60}px)`, filter: 'hue-rotate(90deg) saturate(3)'} : {};
      break;
    }
  }
  return <AbsoluteFill style={{background: '#000'}}><AbsoluteFill style={style}>{children}</AbsoluteFill>{overlay}</AbsoluteFill>;
};

/** Hạt trôi nổi liên tục: bụi, tiền rơi, mưa, tia sáng, giấy vụn. */
export const Particles: React.FC<{kind?: 'dust' | 'money' | 'rain' | 'sparks' | 'confetti' | 'snow'; count?: number}> = ({kind = 'dust', count = 40}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {Array.from({length: count}).map((_, i) => {
        const r = (k: string) => random(`${kind}${i}${k}`);
        const speed = kind === 'rain' ? 40 : kind === 'money' ? 4 + r('s') * 3 : kind === 'sparks' ? -3 - r('s') * 3 : 0.6 + r('s');
        const x = r('x') * 1920 + Math.sin(frame / (20 + r('w') * 30) + i) * (kind === 'money' ? 60 : 20);
        const y = ((r('y') * 1180 + frame * speed) % 1180 + 1180) % 1180 - 50;
        const common: React.CSSProperties = {position: 'absolute', left: x, top: y};
        if (kind === 'money') return <div key={i} style={{...common, width: 46, height: 22, background: C.money, border: '2px solid #0c3a14', transform: `rotate(${frame * (r('r') * 8 - 4)}deg)`, boxShadow: `0 0 12px ${C.money}`}} />;
        if (kind === 'rain') return <div key={i} style={{...common, width: 2, height: 40, background: 'rgba(170,200,255,0.35)', transform: 'rotate(12deg)'}} />;
        if (kind === 'confetti') return <div key={i} style={{...common, width: 14, height: 8, background: ['#ff4d6d', '#ffd23f', C.money, '#4dabff'][i % 4], transform: `rotate(${frame * 9 + i * 40}deg)`}} />;
        if (kind === 'snow') return <div key={i} style={{...common, width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.7}} />;
        if (kind === 'sparks') return <div key={i} style={{...common, width: 5, height: 5, borderRadius: '50%', background: '#ffd27a', boxShadow: '0 0 10px #ffb347', opacity: 0.4 + r('o') * 0.6}} />;
        return <div key={i} style={{...common, width: 3 + r('d') * 4, height: 3 + r('d') * 4, borderRadius: '50%', background: 'rgba(255,240,210,0.35)'}} />;
      })}
    </AbsoluteFill>
  );
};

/** Đường tốc độ manga — cho khoảnh khắc sốc/twist. */
export const SpeedLines: React.FC<{color?: string}> = ({color = 'rgba(255,255,255,0.55)'}) => {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {Array.from({length: 48}).map((_, i) => {
        const a = (i / 48) * Math.PI * 2 + frame * 0.02;
        const r0 = 380 + random(`sl${i}${Math.floor(frame / 2)}`) * 160;
        return <line key={i} x1={960 + Math.cos(a) * r0} y1={540 + Math.sin(a) * r0} x2={960 + Math.cos(a) * 1400} y2={540 + Math.sin(a) * 1400} stroke={color} strokeWidth={3 + (i % 3) * 2} />;
      })}
    </svg>
  );
};

/** Vật bay vào khung đúng từ khóa: emoji/ký hiệu/chữ to. */
export const PopItem: React.FC<{content: string; x: number; y: number; at?: number; size?: number; color?: string; from?: 'scale' | 'left' | 'right' | 'top' | 'bottom'; spin?: boolean}> = ({content, x, y, at = 0, size = 120, color = '#fff', from = 'scale', spin}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 10, stiffness: 190}});
  const off = (1 - p) * 900;
  const t = from === 'left' ? `translateX(${-off}px)` : from === 'right' ? `translateX(${off}px)` : from === 'top' ? `translateY(${-off}px)` : from === 'bottom' ? `translateY(${off}px)` : `scale(${p})`;
  const wobble = Math.sin((frame - at) / 6) * 3;
  if (frame < at) return null;
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: `translate(-50%,-50%) ${t} rotate(${spin ? (frame - at) * 6 : wobble}deg)`, fontSize: size, fontFamily: FONT, color, fontWeight: 800, textShadow: '0 6px 0 rgba(0,0,0,0.35)', whiteSpace: 'nowrap'}}>
      {content}
    </div>
  );
};

/** Rung khung tại các thời điểm va chạm (giây trong shot). */
export const useImpactShake = (hits: number[] = []) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let x = 0, y = 0;
  for (const h of hits) {
    const d = frame - Math.round(h * fps);
    if (d >= 0 && d < 12) {
      const k = 1 - d / 12;
      x += Math.sin(d * 3.3) * 18 * k; y += Math.cos(d * 2.7) * 12 * k;
    }
  }
  return `translate(${x}px, ${y}px)`;
};

/** Nội suy vị trí theo keyframe [{at, x, y}] (giây). */
export const usePath = (path: {at: number; x: number; y: number}[] | undefined, x0: number, y0: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (!path || path.length === 0) return {x: x0, y: y0};
  const pts = [{at: 0, x: x0, y: y0}, ...path];
  const t = pts.map((p) => p.at * fps);
  const opt = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const, easing: Easing.inOut(Easing.quad)};
  return {x: interpolate(frame, t, pts.map((p) => p.x), opt), y: interpolate(frame, t, pts.map((p) => p.y), opt)};
};
