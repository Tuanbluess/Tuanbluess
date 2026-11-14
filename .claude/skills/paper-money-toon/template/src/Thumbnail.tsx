import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Anton';

const HEAD = (() => { try { return loadFont().fontFamily; } catch { return 'Impact, sans-serif'; } })();
import {Character, Expr, Look} from './components/Character';
import {SetView} from './components/Sets';
import {Glow, Vignette} from './components/Overlays';
import {C, FONT} from './theme';

/**
 * Thumbnail 1280x720 theo công thức: nhân vật biếm họa mặt to + biểu cảm cực mạnh,
 * 1 vật ẩn dụ phát sáng, ≤ 4 chữ viết tay to, nền tối tương phản.
 */
export type ThumbSpec = {
  /** Ảnh AI (trong public/) — nếu có thì dùng làm toàn bộ hình, chỉ đặt chữ lên trên */
  image?: string;
  /** Dải chữ trên cùng, phông sans siêu đậm: [{text: "ONE ZIPPER.", color: "white"}, {text: "-$2 TRILLION", color: "red"}] */
  headline?: {text: string; color?: 'white' | 'red' | 'green' | 'yellow'}[];
  set: string;
  hero?: {look: Look; expr: Expr; x?: number; scale?: number};
  second?: {look: Look; expr: Expr; x?: number; scale?: number};
  object?: string; // emoji / ký hiệu phát sáng, vd "💾", "$", "🕵️"
  objectColor?: string;
  text?: string; // ≤ 4 chữ
  textColor?: string;
  arrow?: boolean;
};

const COL = {white: '#ffffff', red: '#ff3b2f', green: '#5CFF3B', yellow: '#ffd23f'};

const Headline: React.FC<{parts: NonNullable<ThumbSpec['headline']>}> = ({parts}) => {
  const len = parts.reduce((n, p) => n + p.text.length + 1, 0);
  const size = Math.min(150, Math.floor(2200 / Math.max(8, len)));
  return (
    <div style={{position: 'absolute', top: 18, left: 0, right: 0, textAlign: 'center', fontFamily: HEAD, fontSize: size, lineHeight: 1, letterSpacing: 1, whiteSpace: 'nowrap'}}>
      {parts.map((p, i) => (
        <span key={i} style={{color: COL[p.color ?? 'white'], WebkitTextStroke: '5px #000', paintOrder: 'stroke fill', textShadow: '6px 6px 0 #000, 0 0 24px rgba(0,0,0,0.8)', marginRight: '0.25em'}}>{p.text.toUpperCase()}</span>
      ))}
    </div>
  );
};

export const Thumbnail: React.FC<{spec: ThumbSpec}> = ({spec}) => spec.image ? (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <Img src={staticFile(spec.image)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 30%)'}} />
    {spec.headline && <Headline parts={spec.headline} />}
  </AbsoluteFill>
) : (
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
    {spec.hero && <div style={{position: 'absolute', left: `${(spec.hero.x ?? 0.24) * 100}%`, bottom: -260, transform: 'translateX(-50%)'}}>
      <Character look={{...spec.hero.look, headScale: (spec.hero.look.headScale ?? 1) * 1.15}} expr={spec.hero.expr} size={900 * (spec.hero.scale ?? 1)} enterAt={-1000} />
    </div>}
    {spec.arrow && (
      <svg viewBox="0 0 1280 720" style={{position: 'absolute', inset: 0}}>
        <path d="M900 120 Q820 200 720 300" stroke={C.danger} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M700 250 L712 318 L774 290Z" fill={C.danger} />
      </svg>
    )}
    <Vignette strength={0.6} />
    {spec.headline && <Headline parts={spec.headline} />}
    {spec.text && (
      <div style={{position: 'absolute', right: 50, top: 40, maxWidth: 640, textAlign: 'right', fontFamily: FONT, fontSize: 118, lineHeight: 0.95, fontWeight: 800, color: spec.textColor ?? '#fff', textShadow: '0 0 0 #000, 6px 6px 0 #000, -3px -3px 0 #000, 0 0 30px rgba(0,0,0,0.6)', transform: 'rotate(-3deg)'}}>
        {spec.text.toUpperCase()}
      </div>
    )}
  </AbsoluteFill>
);
