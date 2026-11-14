import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Character, Expr, Look} from './components/Character';
import {SetView} from './components/Sets';
import {Glow, Vignette} from './components/Overlays';
import {C, FONT} from './theme';

/**
 * Thumbnail 1280x720 theo công thức: nhân vật biếm họa mặt to + biểu cảm cực mạnh,
 * 1 vật ẩn dụ phát sáng, ≤ 4 chữ viết tay to, nền tối tương phản.
 */
export type ThumbSpec = {
  set: string;
  hero: {look: Look; expr: Expr; x?: number; scale?: number};
  second?: {look: Look; expr: Expr; x?: number; scale?: number};
  object?: string; // emoji / ký hiệu phát sáng, vd "💾", "$", "🕵️"
  objectColor?: string;
  text?: string; // ≤ 4 chữ
  textColor?: string;
  arrow?: boolean;
};

export const Thumbnail: React.FC<{spec: ThumbSpec}> = ({spec}) => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <SetView name={spec.set} />
    <AbsoluteFill style={{background: 'rgba(0,0,0,0.25)'}} />
    {spec.object && (
      <>
        <Glow x={0.5} y={0.55} r={260} color={spec.objectColor ?? C.money} />
        <div style={{position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%,-50%) rotate(-8deg)', fontSize: 220, filter: `drop-shadow(0 0 30px ${spec.objectColor ?? C.money})`, color: spec.objectColor ?? C.money, fontFamily: FONT, fontWeight: 800}}>{spec.object}</div>
      </>
    )}
    {spec.second && (
      <div style={{position: 'absolute', left: `${(spec.second.x ?? 0.8) * 100}%`, bottom: -60, transform: 'translateX(-50%)'}}>
        <Character look={spec.second.look} expr={spec.second.expr} size={620 * (spec.second.scale ?? 1)} facing={-1} enterAt={-1000} />
      </div>
    )}
    <div style={{position: 'absolute', left: `${(spec.hero.x ?? 0.24) * 100}%`, bottom: -140, transform: 'translateX(-50%)'}}>
      <Character look={{...spec.hero.look, headScale: (spec.hero.look.headScale ?? 1) * 1.15}} expr={spec.hero.expr} size={900 * (spec.hero.scale ?? 1)} enterAt={-1000} />
    </div>
    {spec.arrow && (
      <svg viewBox="0 0 1280 720" style={{position: 'absolute', inset: 0}}>
        <path d="M900 120 Q820 200 720 300" stroke={C.danger} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M700 250 L712 318 L774 290Z" fill={C.danger} />
      </svg>
    )}
    {spec.text && (
      <div style={{position: 'absolute', right: 50, top: 40, maxWidth: 640, textAlign: 'right', fontFamily: FONT, fontSize: 118, lineHeight: 0.95, fontWeight: 800, color: spec.textColor ?? '#fff', textShadow: '0 0 0 #000, 6px 6px 0 #000, -3px -3px 0 #000, 0 0 30px rgba(0,0,0,0.6)', transform: 'rotate(-3deg)'}}>
        {spec.text.toUpperCase()}
      </div>
    )}
    <Vignette strength={0.6} />
  </AbsoluteFill>
);
