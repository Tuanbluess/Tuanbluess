import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';

export type Expr = 'neutral' | 'happy' | 'talk' | 'shock' | 'sad' | 'smug' | 'doubt';
export type Look = {
  hair?: 'silver' | 'bob' | 'short' | 'bald' | 'slick' | 'bun';
  hairColor?: string;
  glasses?: 'none' | 'round' | 'shades';
  outfit?: string;
  tie?: string;
  skin?: string;
};

/** Nhân vật đầu tròn, thân hạt đậu. Kích thước gốc 200x340, scale bằng prop `size` (px chiều cao). */
export const Character: React.FC<{
  look: Look;
  expr?: Expr;
  talking?: boolean;
  size?: number;
  facing?: 1 | -1;
  enterAt?: number; // frame bật vào (pop)
}> = ({look, expr = 'neutral', talking = false, size = 340, facing = 1, enterAt = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - enterAt, fps, config: {damping: 11, stiffness: 180}});
  const breathe = Math.sin(frame / 9) * 2;
  const blink = frame % 96 > 90;
  const mouthOpen = talking ? (Math.sin(frame * 1.7) + Math.sin(frame * 0.9)) * 0.5 + 0.5 : 0;
  const skin = look.skin ?? C.skin;
  const outfit = look.outfit ?? C.navy;
  const hairColor = look.hairColor ?? (look.hair === 'silver' ? '#d9d9de' : '#16141a');
  const s = size / 340;

  const eyeY = 120;
  const brow = {
    neutral: [0, 0], happy: [-4, -4], talk: [0, 0], shock: [-10, -10],
    sad: [6, -6], smug: [-2, 4], doubt: [-10, 4],
  }[expr];

  const mouth = () => {
    if (expr === 'shock') return <rect x={78} y={150} width={44} height={22} rx={4} fill="#fff" stroke={C.ink} strokeWidth={3} />;
    if (expr === 'happy') return <path d="M72 150 Q100 182 128 150 Z" fill="#7a2230" stroke={C.ink} strokeWidth={3} />;
    if (expr === 'sad') return <path d="M82 166 Q100 150 118 166" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    if (expr === 'smug') return <path d="M84 156 Q104 166 120 150" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    if (talking || expr === 'talk')
      return <ellipse cx={100} cy={158} rx={12} ry={3 + mouthOpen * 9} fill="#7a2230" stroke={C.ink} strokeWidth={3} />;
    return <path d="M86 156 Q100 164 114 156" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
  };

  const hair = () => {
    switch (look.hair) {
      case 'silver':
        return <path d="M28 108 Q20 40 70 30 Q100 10 140 30 Q186 44 172 110 Q160 70 130 62 Q100 74 70 62 Q40 72 28 108Z" fill={hairColor} stroke={C.ink} strokeWidth={3} />;
      case 'bob':
        return <path d="M22 150 Q10 40 100 28 Q190 40 178 150 L160 150 Q164 80 100 70 Q36 80 40 150Z" fill={hairColor} />;
      case 'slick':
        return <path d="M30 96 Q34 36 100 32 Q166 36 170 96 Q140 58 100 60 Q60 58 30 96Z" fill={hairColor} />;
      case 'bun':
        return <><circle cx={100} cy={28} r={22} fill={hairColor} /><path d="M30 100 Q30 40 100 38 Q170 40 170 100 Q100 60 30 100Z" fill={hairColor} /></>;
      case 'short':
        return <path d="M32 92 Q36 34 100 34 Q164 34 168 92 L150 70 L120 78 L96 64 L70 78 L50 70Z" fill={hairColor} />;
      default:
        return null;
    }
  };

  const glasses = () => {
    if (look.glasses === 'round')
      return <g fill="rgba(255,255,255,0.25)" stroke={C.ink} strokeWidth={3}><circle cx={74} cy={eyeY} r={17} /><circle cx={126} cy={eyeY} r={17} /><path d="M91 120 L109 120" /></g>;
    if (look.glasses === 'shades')
      return <g fill="#0b0b0f"><rect x={54} y={108} width={40} height={22} rx={8} /><rect x={106} y={108} width={40} height={22} rx={8} /><rect x={92} y={114} width={16} height={4} /></g>;
    return null;
  };

  return (
    <svg
      width={200 * s}
      height={340 * s}
      viewBox="0 0 200 340"
      style={{overflow: 'visible', transform: `scale(${facing * pop}, ${pop})`, transformOrigin: '50% 100%'}}
    >
      <ellipse cx={100} cy={334} rx={58} ry={8} fill="rgba(0,0,0,0.28)" />
      {/* chân */}
      <g stroke={C.ink} strokeWidth={6} strokeLinecap="round">
        <line x1={84} y1={290} x2={80} y2={330} />
        <line x1={116} y1={290} x2={120} y2={330} />
      </g>
      {/* thân hạt đậu */}
      <g transform={`translate(0 ${breathe})`}>
        <path d="M58 212 Q54 184 100 182 Q146 184 142 212 L148 282 Q148 300 100 300 Q52 300 52 282Z" fill={outfit} stroke={C.ink} strokeWidth={3} />
        {look.tie && <path d="M96 190 L104 190 L108 240 L100 252 L92 240Z" fill={look.tie} />}
        <g stroke={C.ink} strokeWidth={6} strokeLinecap="round">
          <line x1={58} y1={214} x2={44} y2={270} />
          <line x1={142} y1={214} x2={156} y2={270} />
        </g>
        {/* đầu */}
        <g transform={`translate(0 ${breathe * 0.5})`}>
          <defs>
            <radialGradient id="face" cx="45%" cy="38%" r="70%">
              <stop offset="0%" stopColor={skin} />
              <stop offset="100%" stopColor={shade(skin)} />
            </radialGradient>
          </defs>
          <circle cx={100} cy={112} r={80} fill="url(#face)" stroke={C.ink} strokeWidth={3} />
          {hair()}
          {/* mắt */}
          {blink || expr === 'happy' ? (
            <g stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round">
              <path d={`M64 ${eyeY} Q74 ${eyeY - 8} 84 ${eyeY}`} />
              <path d={`M116 ${eyeY} Q126 ${eyeY - 8} 136 ${eyeY}`} />
            </g>
          ) : (
            <g fill={C.ink}>
              <circle cx={74} cy={eyeY} r={expr === 'shock' ? 4 : 6} />
              <circle cx={126} cy={eyeY} r={expr === 'shock' ? 4 : 6} />
            </g>
          )}
          <g stroke={C.ink} strokeWidth={4} strokeLinecap="round">
            <line x1={62} y1={96 + brow[0]} x2={86} y2={96 - brow[0] * 0.3} />
            <line x1={114} y1={96 - brow[1] * 0.3} x2={138} y2={96 + brow[1]} />
          </g>
          {glasses()}
          {mouth()}
          <ellipse cx={58} cy={146} rx={10} ry={6} fill="rgba(230,90,90,0.25)" />
          <ellipse cx={142} cy={146} rx={10} ry={6} fill="rgba(230,90,90,0.25)" />
        </g>
      </g>
    </svg>
  );
};

function shade(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.round(v * 0.82));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

export const usePopIn = (at: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config: {damping: 12, stiffness: 200}});
};

export const fadeIn = (frame: number, at: number, d = 8) =>
  interpolate(frame, [at, at + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
