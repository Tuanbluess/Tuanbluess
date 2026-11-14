import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

/** Thẻ đen: chữ trắng viết tay hiện từng từ trong `revealSec` giây. */
export const BlackCard: React.FC<{text: string; revealSec?: number}> = ({text, revealSec}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const words = text.split(' ');
  const total = (revealSec ?? Math.min(durationInFrames / fps * 0.75, words.length * 0.28)) * fps;
  const shown = Math.ceil(interpolate(frame, [0, total], [1, words.length], {extrapolateRight: 'clamp'}));
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONT, color: '#fff', fontSize: 64, fontStyle: 'italic', maxWidth: 1500, textAlign: 'center', lineHeight: 1.25}}>
        {words.slice(0, shown).join(' ')}
      </div>
    </AbsoluteFill>
  );
};

/** Nhãn tên góc dưới: ngoặc xanh + tên in hoa + chức danh. */
export const NameTag: React.FC<{name: string; role?: string; x?: number; y?: number; at?: number}> = ({name, role, x = 0.55, y = 0.78, at = 6}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [at, at + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, fontFamily: FONT, color: '#fff'}}>
      <div style={{borderLeft: `5px solid ${C.money}`, background: 'rgba(0,0,0,0.65)', padding: '6px 22px', clipPath: `inset(0 ${100 - w * 100}% 0 0)`}}>
        <div style={{fontSize: 44, letterSpacing: 2}}>{name.toUpperCase()}</div>
        {role && <div style={{fontSize: 26, color: C.money}}>{role}</div>}
      </div>
    </div>
  );
};

/** Chữ viết tay (số liệu, ngày, địa điểm). `countTo` để đếm số tiền lên. */
export const Label: React.FC<{text: string; x: number; y: number; size?: number; color?: string; at?: number; countTo?: number; prefix?: string; glow?: boolean}> = ({text, x, y, size = 40, color = '#fff', at = 0, countTo, prefix = '$', glow}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 12}});
  const v = countTo !== undefined
    ? prefix + Math.round(interpolate(frame, [at, at + 20], [0, countTo], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})).toLocaleString('en-US')
    : text;
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: `translate(-50%,-50%) scale(${p}) rotate(-3deg)`, fontFamily: FONT, fontSize: size, color, fontWeight: 700, textShadow: glow ? `0 0 18px ${color}` : '2px 2px 0 rgba(0,0,0,0.5)'}}>
      {v}
    </div>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.7}) => (
  <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`}} />
);

export const Glow: React.FC<{x: number; y: number; r?: number; color?: string; flicker?: boolean}> = ({x, y, r = 260, color = '#ffb347', flicker}) => {
  const frame = useCurrentFrame();
  const o = flicker ? 0.75 + Math.sin(frame * 0.7) * 0.08 + Math.sin(frame * 1.9) * 0.05 : 0.8;
  return <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity: o, mixBlendMode: 'screen'}} />;
};

/** Cột tiền xanh phát sáng mọc lên. */
export const MoneyStack: React.FC<{x: number; y: number; bills?: number; at?: number; width?: number}> = ({x, y, bills = 14, at = 0, width = 220}) => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame, [at, at + bills * 1.5], [0, bills], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column-reverse', filter: `drop-shadow(0 0 22px ${C.money})`}}>
      {Array.from({length: n}).map((_, i) => (
        <div key={i} style={{width, height: 16, marginTop: -2, background: `linear-gradient(90deg, ${C.moneyDeep}, ${C.money} 50%, ${C.moneyDeep})`, border: `2px solid #0c3a14`, borderRadius: 3}} />
      ))}
    </div>
  );
};
