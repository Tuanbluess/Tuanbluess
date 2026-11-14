import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';

export type Expr = 'neutral' | 'happy' | 'talk' | 'shock' | 'sad' | 'smug' | 'doubt' | 'angry' | 'cry' | 'sweat';

/**
 * Bộ "dấu hiệu nhận diện" để biếm họa người thật kiểu meme:
 * 1 kiểu tóc + 1 màu tóc + 1 phụ kiện mặt + 1 trang phục đặc trưng + 1 đồ vật hay cầm.
 */
export type Look = {
  hair?: 'silver' | 'swept' | 'bob' | 'short' | 'bald' | 'slick' | 'bun' | 'messy' | 'sidepart' | 'long' | 'curly' | 'spiky' | 'combover' | 'buzz' | 'receding' | 'ponytail';
  hairColor?: string;
  glasses?: 'none' | 'narrow' | 'round' | 'shades' | 'square' | 'rimless' | 'aviator';
  beard?: 'none' | 'stubble' | 'full' | 'goatee' | 'mustache' | 'gray-stubble';
  beardColor?: string;
  outfit?: 'suit' | 'leather' | 'turtleneck' | 'hoodie' | 'tshirt' | 'dress' | 'vest' | 'blazer' | 'uniform';
  outfitColor?: string;
  shirtColor?: string;
  tie?: string;
  logo?: string; // chữ/ký hiệu in trên áo (vd "X", "f", "AI")
  hat?: 'none' | 'cap' | 'cowboy' | 'top' | 'beanie' | 'maga';
  hatColor?: string;
  earrings?: boolean;
  wrinkles?: boolean; // nếp nhăn trán = người lớn tuổi
  eyeBags?: boolean;
  cheeks?: boolean;
  skin?: string;
  headScale?: number; // 1 = bình thường; 1.15 = "đầu to" kiểu chibi meme
  holding?: 'none' | 'phone' | 'coffee' | 'cigar' | 'chip' | 'briefcase' | 'money' | 'mic' | 'rocket' | 'burger';
  /** Màu cho đồ vật đang cầm */
  holdingColor?: string;
};

const HAIR_DEFAULT: Record<string, string> = {silver: '#dcdce2', swept: '#d6d6d2'};

export const Character: React.FC<{
  look: Look;
  expr?: Expr;
  talking?: boolean;
  size?: number;
  facing?: 1 | -1;
  enterAt?: number;
  /** Vung tay khi nói (true mặc định khi talking) */
  gesture?: boolean;
}> = ({look, expr = 'neutral', talking = false, size = 340, facing = 1, enterAt = 0, gesture}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - enterAt, fps, config: {damping: 11, stiffness: 180}});
  // chuyển động phụ liên tục: thở, lắc lư, nhún khi nói
  const breathe = Math.sin(frame / 9) * 2;
  const sway = Math.sin(frame / 23) * 1.5 + (talking ? Math.sin(frame / 4) * 1.2 : 0);
  const bob = talking ? Math.abs(Math.sin(frame / 5)) * -3 : 0;
  const blink = frame % 96 > 90;
  const mouthOpen = talking ? (Math.sin(frame * 1.7) + Math.sin(frame * 0.9)) * 0.5 + 0.5 : 0;
  const doGesture = gesture ?? talking;
  const armL = doGesture ? Math.sin(frame / 6) * 14 : 0;
  const armR = doGesture ? Math.cos(frame / 7) * 18 : 0;

  const skin = look.skin ?? C.skin;
  const outfit = look.outfit ?? 'suit';
  const oc = look.outfitColor ?? (outfit === 'leather' ? '#141414' : outfit === 'turtleneck' ? '#111' : C.navy);
  const shirt = look.shirtColor ?? '#f4f4f4';
  const hairColor = look.hairColor ?? HAIR_DEFAULT[look.hair ?? ''] ?? '#16141a';
  const beardColor = look.beardColor ?? (look.beard === 'gray-stubble' ? '#9a9aa0' : hairColor);
  const hs = look.headScale ?? 1;
  const s = size / 340;
  const eyeY = 120;

  const brow = ({
    neutral: [0, 0], happy: [-4, -4], talk: [0, 0], shock: [-10, -10], sad: [6, -6],
    smug: [-2, 4], doubt: [-10, 4], angry: [10, 10], cry: [8, -8], sweat: [4, -4],
  } as Record<Expr, number[]>)[expr];

  const mouth = () => {
    if (expr === 'shock') return <rect x={78} y={150} width={44} height={22} rx={4} fill="#fff" stroke={C.ink} strokeWidth={3} />;
    if (expr === 'happy') return <path d="M72 150 Q100 182 128 150 Z" fill="#7a2230" stroke={C.ink} strokeWidth={3} />;
    if (expr === 'sad' || expr === 'cry') return <path d="M82 166 Q100 150 118 166" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    if (expr === 'smug') return <path d="M84 156 Q104 166 120 150" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    if (expr === 'angry') return <path d="M80 164 L120 164" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
    if (expr === 'sweat') return <path d="M82 160 Q92 152 100 160 Q108 168 118 158" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    if (talking || expr === 'talk') return <ellipse cx={100} cy={158} rx={12} ry={3 + mouthOpen * 9} fill="#7a2230" stroke={C.ink} strokeWidth={3} />;
    return <path d="M86 156 Q100 164 114 156" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
  };

  const hair = () => {
    const f = hairColor;
    switch (look.hair) {
      case 'silver':
        return <path d="M28 108 Q20 40 70 30 Q100 10 140 30 Q186 44 172 110 Q160 70 130 62 Q100 74 70 62 Q40 72 28 108Z" fill={f} stroke={C.ink} strokeWidth={3} />;
      case 'swept':
        // tóc bạc dày vuốt sang phải, có mái lệch + lọn tóc (kiểu "ông chủ áo da")
        return (
          <g>
            <path d="M24 120 Q8 52 56 26 Q104 0 150 18 Q196 36 186 96 Q182 118 176 130 Q170 92 150 74 Q126 84 96 80 Q70 92 50 84 Q40 98 36 124Z" fill={f} stroke={C.ink} strokeWidth={3} />
            <path d="M50 84 Q66 52 112 50 Q146 50 170 74 Q150 60 116 62 Q80 64 62 90Z" fill={shade(f.startsWith('#') ? f : '#d6d6d2')} opacity={0.5} />
            <g stroke="rgba(60,60,70,0.45)" strokeWidth={2.5} fill="none" strokeLinecap="round">
              <path d="M60 40 Q100 26 150 34" /><path d="M48 60 Q96 40 166 56" /><path d="M150 30 Q176 52 178 92" /><path d="M40 70 Q34 92 36 116" /><path d="M120 18 Q150 24 170 44" />
            </g>
          </g>
        );
      case 'bob':
        return <path d="M22 150 Q10 40 100 28 Q190 40 178 150 L160 150 Q164 80 100 70 Q36 80 40 150Z" fill={f} />;
      case 'slick':
        return <path d="M30 96 Q34 36 100 32 Q166 36 170 96 Q140 58 100 60 Q60 58 30 96Z" fill={f} />;
      case 'bun':
        return <><circle cx={100} cy={28} r={22} fill={f} /><path d="M30 100 Q30 40 100 38 Q170 40 170 100 Q100 60 30 100Z" fill={f} /></>;
      case 'short':
        return <path d="M32 92 Q36 34 100 34 Q164 34 168 92 L150 70 L120 78 L96 64 L70 78 L50 70Z" fill={f} />;
      case 'messy':
        return <path d="M26 100 L30 60 L18 52 L44 44 L40 24 L70 34 L84 12 L104 30 L126 10 L136 34 L166 26 L160 50 L184 58 L170 72 L174 100 Q150 66 100 64 Q50 66 26 100Z" fill={f} />;
      case 'sidepart':
        return <path d="M28 104 Q24 34 96 30 Q176 30 172 100 Q168 66 120 60 L76 58 Q60 50 50 66 Q36 80 28 104Z" fill={f} />;
      case 'long':
        return <path d="M18 230 Q6 40 100 28 Q194 40 182 230 L160 230 Q168 90 100 74 Q32 90 40 230Z" fill={f} />;
      case 'curly':
        return <g fill={f}>{[[40, 70], [60, 44], [90, 32], [120, 34], [148, 48], [164, 76], [30, 100], [172, 104]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={22} />)}</g>;
      case 'spiky':
        return <path d="M28 96 L22 50 L50 64 L54 22 L80 54 L100 14 L120 54 L146 22 L150 64 L178 50 L172 96 Q140 70 100 70 Q60 70 28 96Z" fill={f} />;
      case 'combover':
        return <path d="M24 104 Q20 50 60 36 Q120 18 180 60 Q186 80 178 104 Q170 76 140 62 Q90 50 54 66 Q34 80 24 104Z" fill={f} />;
      case 'buzz':
        return <path d="M30 100 Q30 36 100 34 Q170 36 170 100 Q150 60 100 58 Q50 60 30 100Z" fill={f} opacity={0.55} />;
      case 'receding':
        return <><path d="M24 120 Q22 70 40 60 Q46 90 40 120Z" fill={f} /><path d="M176 120 Q178 70 160 60 Q154 90 160 120Z" fill={f} /></>;
      case 'ponytail':
        return <><path d="M168 80 Q210 110 186 190 Q176 150 162 110Z" fill={f} /><path d="M30 100 Q30 36 100 34 Q170 36 170 100 Q120 56 30 100Z" fill={f} /></>;
      default:
        return null;
    }
  };

  const beard = () => {
    const b = beardColor;
    switch (look.beard) {
      case 'stubble':
      case 'gray-stubble':
        return <path d="M40 140 Q48 196 100 196 Q152 196 160 140 Q150 176 100 178 Q50 176 40 140Z" fill={b} opacity={0.35} />;
      case 'full':
        return <path d="M34 130 Q36 214 100 214 Q164 214 166 130 Q150 150 130 146 Q100 172 70 146 Q50 150 34 130Z" fill={b} />;
      case 'goatee':
        return <path d="M84 168 Q100 200 116 168 Q100 176 84 168Z" fill={b} />;
      case 'mustache':
        return <path d="M72 146 Q86 136 100 144 Q114 136 128 146 Q114 152 100 148 Q86 152 72 146Z" fill={b} />;
      default:
        return null;
    }
  };

  const glasses = () => {
    switch (look.glasses) {
      case 'round':
        return <g fill="rgba(255,255,255,0.25)" stroke={C.ink} strokeWidth={3}><circle cx={74} cy={eyeY} r={17} /><circle cx={126} cy={eyeY} r={17} /><path d="M91 120 L109 120" /></g>;
      case 'narrow':
        // kính chữ nhật nhỏ, hẹp, đeo thấp trên sống mũi
        return <g fill="rgba(255,255,255,0.18)" stroke={C.ink} strokeWidth={3}><rect x={58} y={118} width={32} height={13} rx={2} /><rect x={110} y={118} width={32} height={13} rx={2} /><path d="M90 123 Q100 119 110 123" fill="none" /><path d="M58 122 L36 116" /><path d="M142 122 L164 116" /></g>;
      case 'square':
        return <g fill="rgba(255,255,255,0.2)" stroke={C.ink} strokeWidth={4}><rect x={54} y={106} width={38} height={28} rx={4} /><rect x={108} y={106} width={38} height={28} rx={4} /><path d="M92 118 L108 118" /></g>;
      case 'rimless':
        return <g fill="rgba(200,230,255,0.25)" stroke="#888" strokeWidth={1.5}><rect x={56} y={108} width={36} height={24} rx={10} /><rect x={108} y={108} width={36} height={24} rx={10} /><path d="M92 118 L108 118" /></g>;
      case 'aviator':
        return <g fill="#2a3a4a" stroke="#c9a94a" strokeWidth={2}><path d="M54 110 L94 110 Q94 140 74 138 Q54 136 54 110Z" /><path d="M106 110 L146 110 Q146 136 126 138 Q106 140 106 110Z" /><path d="M94 112 L106 112" /></g>;
      case 'shades':
        return <g fill="#0b0b0f"><rect x={54} y={108} width={40} height={22} rx={8} /><rect x={106} y={108} width={40} height={22} rx={8} /><rect x={92} y={114} width={16} height={4} /></g>;
      default:
        return null;
    }
  };

  const hat = () => {
    const hc = look.hatColor ?? (look.hat === 'maga' ? '#c8102e' : '#222');
    switch (look.hat) {
      case 'cap':
      case 'maga':
        return <g><path d="M30 76 Q34 22 100 20 Q166 22 170 76Z" fill={hc} stroke={C.ink} strokeWidth={3} /><path d="M120 72 Q176 66 196 80 Q170 88 120 82Z" fill={hc} stroke={C.ink} strokeWidth={3} /></g>;
      case 'cowboy':
        return <g fill={hc} stroke={C.ink} strokeWidth={3}><ellipse cx={100} cy={62} rx={104} ry={18} /><path d="M50 62 Q54 4 100 10 Q146 4 150 62Z" /></g>;
      case 'top':
        return <g fill={hc} stroke={C.ink} strokeWidth={3}><rect x={56} y={-40} width={88} height={86} /><ellipse cx={100} cy={46} rx={74} ry={10} /></g>;
      case 'beanie':
        return <g><path d="M28 84 Q30 16 100 14 Q170 16 172 84Z" fill={hc} /><rect x={24} y={72} width={152} height={18} rx={8} fill={hc} stroke={C.ink} strokeWidth={2} /></g>;
      default:
        return null;
    }
  };

  const torso = () => {
    const body = 'M58 212 Q54 184 100 182 Q146 184 142 212 L148 282 Q148 300 100 300 Q52 300 52 282Z';
    return (
      <g>
        <path d={body} fill={outfit === 'tshirt' || outfit === 'hoodie' || outfit === 'turtleneck' || outfit === 'dress' ? oc : shirt} stroke={C.ink} strokeWidth={3} />
        {(outfit === 'suit' || outfit === 'blazer' || outfit === 'leather' || outfit === 'vest' || outfit === 'uniform') && (
          <>
            <path d="M58 212 Q54 184 92 182 L100 250 L96 300 Q52 300 52 282Z" fill={oc} stroke={C.ink} strokeWidth={3} />
            <path d="M142 212 Q146 184 108 182 L100 250 L104 300 Q148 300 148 282Z" fill={oc} stroke={C.ink} strokeWidth={3} />
            {outfit === 'leather' && (
              // áo khoác da biker: chi tiết dày hơn mặt -> là "chữ ký" nhận diện
              <g>
                <path d="M100 186 L100 300" stroke="#9a9aa0" strokeWidth={3} />
                <path d="M100 190 L100 296" stroke="#cfcfd4" strokeWidth={1.5} strokeDasharray="2 3" />
                <rect x={95} y={222} width={10} height={16} rx={2} fill="#d8d8dc" stroke={C.ink} strokeWidth={1.5} />
                <path d="M70 184 L94 186 L84 212 L62 222 Q58 200 70 184Z" fill="#232326" stroke={C.ink} strokeWidth={2.5} />
                <path d="M130 184 L106 186 L116 212 L138 222 Q142 200 130 184Z" fill="#232326" stroke={C.ink} strokeWidth={2.5} />
                <circle cx={70} cy={214} r={2.5} fill="#bbb" /><circle cx={130} cy={214} r={2.5} fill="#bbb" />
                <path d="M112 232 L136 252" stroke="#bfbfc4" strokeWidth={3} strokeLinecap="round" />
                <path d="M62 262 L86 262" stroke="#bfbfc4" strokeWidth={3} strokeLinecap="round" />
                <path d="M114 268 L138 268" stroke="#bfbfc4" strokeWidth={3} strokeLinecap="round" />
                <path d="M58 212 Q72 200 88 204" stroke="#3a3a3e" strokeWidth={2} fill="none" />
                <path d="M142 212 Q128 200 112 204" stroke="#3a3a3e" strokeWidth={2} fill="none" />
                <rect x={54} y={284} width={92} height={12} rx={4} fill="#1a1a1d" stroke={C.ink} strokeWidth={2} />
                <path d="M66 230 Q70 250 66 276" stroke="rgba(255,255,255,0.22)" strokeWidth={4} fill="none" strokeLinecap="round" />
                <path d="M132 230 Q128 248 132 270" stroke="rgba(255,255,255,0.15)" strokeWidth={3} fill="none" strokeLinecap="round" />
              </g>
            )}
            {outfit === 'uniform' && <g fill="#e2c044">{[220, 244, 268].map((y) => <circle key={y} cx={112} cy={y} r={4} />)}</g>}
          </>
        )}
        {outfit === 'turtleneck' && <rect x={76} y={178} width={48} height={16} rx={6} fill={oc} stroke={C.ink} strokeWidth={2} />}
        {outfit === 'hoodie' && <g><path d="M64 196 Q100 230 136 196" fill="none" stroke={C.ink} strokeWidth={3} /><line x1={92} y1={208} x2={90} y2={236} stroke="#ddd" strokeWidth={3} /><line x1={108} y1={208} x2={110} y2={236} stroke="#ddd" strokeWidth={3} /></g>}
        {look.tie && <path d="M96 190 L104 190 L108 240 L100 252 L92 240Z" fill={look.tie} />}
        {look.logo && <text x={100} y={258} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff" fontFamily="Arial">{look.logo}</text>}
      </g>
    );
  };

  const held = () => {
    const hc = look.holdingColor;
    switch (look.holding) {
      case 'phone': return <rect x={150} y={248} width={18} height={30} rx={3} fill={hc ?? '#111'} stroke="#888" strokeWidth={2} />;
      case 'coffee': return <g><rect x={148} y={250} width={22} height={28} rx={3} fill={hc ?? '#fff'} stroke={C.ink} strokeWidth={2} /><rect x={148} y={258} width={22} height={8} fill="#8b5a2b" /></g>;
      case 'cigar': return <g><rect x={150} y={262} width={30} height={6} fill="#6b3e1e" /><circle cx={182} cy={265} r={3} fill="#ff6a00" /></g>;
      case 'chip': return <g style={{filter: 'drop-shadow(0 0 6px #5CFF3B)'}}><rect x={146} y={250} width={30} height={30} rx={3} fill={hc ?? '#1d6b2a'} stroke="#5CFF3B" strokeWidth={2} /><rect x={154} y={258} width={14} height={14} fill="#0d2a10" /></g>;
      case 'briefcase': return <g><rect x={140} y={270} width={40} height={28} rx={3} fill={hc ?? '#5a3a1e'} stroke={C.ink} strokeWidth={2} /><rect x={152} y={264} width={16} height={8} fill="none" stroke={C.ink} strokeWidth={2} /></g>;
      case 'money': return <g><rect x={144} y={256} width={40} height={20} rx={2} fill="#5CFF3B" stroke="#0c3a14" strokeWidth={2} /><text x={164} y={271} textAnchor="middle" fontSize={14} fontWeight={800} fill="#0c3a14">$</text></g>;
      case 'mic': return <g><rect x={154} y={258} width={8} height={30} fill="#333" /><circle cx={158} cy={254} r={9} fill="#777" /></g>;
      case 'rocket': return <g><path d="M160 236 Q172 250 168 280 L152 280 Q148 250 160 236Z" fill={hc ?? '#eee'} stroke={C.ink} strokeWidth={2} /><path d="M152 280 L160 296 L168 280Z" fill="#ff7a00" /></g>;
      case 'burger': return <g><path d="M144 266 Q164 244 184 266Z" fill="#d9952f" /><rect x={144} y={266} width={40} height={6} fill="#5a2e14" /><rect x={144} y={272} width={40} height={6} rx={3} fill="#d9952f" /></g>;
      default: return null;
    }
  };

  return (
    <svg width={200 * s} height={340 * s} viewBox="0 0 200 340"
      style={{overflow: 'visible', transform: `scale(${facing * pop}, ${pop}) rotate(${sway}deg)`, transformOrigin: '50% 100%'}}>
      <ellipse cx={100} cy={334} rx={58} ry={8} fill="rgba(0,0,0,0.28)" />
      <g stroke={C.ink} strokeWidth={6} strokeLinecap="round">
        <line x1={84} y1={290} x2={80} y2={330} />
        <line x1={116} y1={290} x2={120} y2={330} />
      </g>
      <g transform={`translate(0 ${breathe + bob})`}>
        {torso()}
        <g stroke={look.outfit === 'tshirt' ? skin : oc} strokeWidth={10} strokeLinecap="round">
          <line x1={58} y1={214} x2={44} y2={270} transform={`rotate(${armL} 58 214)`} />
          <line x1={142} y1={214} x2={156} y2={270} transform={`rotate(${-armR} 142 214)`} />
        </g>
        <g transform={`rotate(${-armR} 142 214)`}>{held()}</g>
        <g transform={`translate(100 ${112 + breathe * 0.5}) scale(${hs}) translate(-100 -112)`}>
          <defs>
            <radialGradient id={`face-${skin}`} cx="45%" cy="38%" r="70%">
              <stop offset="0%" stopColor={skin} />
              <stop offset="100%" stopColor={shade(skin)} />
            </radialGradient>
          </defs>
          {look.hair === 'long' && hair()}
          <circle cx={100} cy={112} r={80} fill={`url(#face-${skin})`} stroke={C.ink} strokeWidth={3} />
          {look.wrinkles && <g stroke="rgba(0,0,0,0.25)" strokeWidth={2} fill="none"><path d="M70 82 Q100 76 130 82" /><path d="M76 72 Q100 66 124 72" /></g>}
          {beard()}
          {look.hair !== 'long' && hair()}
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
          {look.eyeBags && <g stroke="rgba(80,40,60,0.35)" strokeWidth={2} fill="none"><path d="M64 132 Q74 138 84 132" /><path d="M116 132 Q126 138 136 132" /></g>}
          <g stroke={C.ink} strokeWidth={4} strokeLinecap="round">
            <line x1={62} y1={96 + brow[0]} x2={86} y2={96 - brow[0] * 0.3} />
            <line x1={114} y1={96 - brow[1] * 0.3} x2={138} y2={96 + brow[1]} />
          </g>
          {glasses()}
          {mouth()}
          {look.beard === 'mustache' && beard()}
          {look.earrings && <g fill="#e8c34a"><circle cx={22} cy={128} r={5} /><circle cx={178} cy={128} r={5} /></g>}
          {(look.cheeks ?? true) && <><ellipse cx={58} cy={146} rx={10} ry={6} fill="rgba(230,90,90,0.25)" /><ellipse cx={142} cy={146} rx={10} ry={6} fill="rgba(230,90,90,0.25)" /></>}
          {expr === 'sweat' && <path d="M160 70 Q168 86 160 94 Q152 86 160 70Z" fill="#7fd0ff" stroke={C.ink} strokeWidth={2} />}
          {expr === 'cry' && <g fill="#7fd0ff"><rect x={70} y={128} width={8} height={40} rx={4} /><rect x={122} y={128} width={8} height={40} rx={4} /></g>}
          {expr === 'angry' && <path d="M150 50 l10 -10 m-10 0 l10 10 m6 -4 l10 -10" stroke={C.danger} strokeWidth={4} />}
          {hat()}
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

export const fadeIn = (frame: number, at: number, d = 8) =>
  interpolate(frame, [at, at + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
