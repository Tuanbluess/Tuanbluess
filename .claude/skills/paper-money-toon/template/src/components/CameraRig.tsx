import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type Move = 'static' | 'pushIn' | 'pullOut' | 'panLeft' | 'panRight' | 'shake' | 'whip';

/** Camera trôi liên tục trong suốt shot — không bao giờ để khung chết. */
export const CameraRig: React.FC<{move?: Move; amount?: number; children: React.ReactNode}> = ({move = 'pushIn', amount = 0.06, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {easing: Easing.inOut(Easing.quad)});
  let scale = 1.04, x = 0, y = 0, rot = 0;
  switch (move) {
    case 'pushIn': scale = 1.02 + amount * t; break;
    case 'pullOut': scale = 1.02 + amount * (1 - t); break;
    case 'panLeft': scale = 1.12; x = interpolate(t, [0, 1], [amount, -amount]) * 600; break;
    case 'panRight': scale = 1.12; x = interpolate(t, [0, 1], [-amount, amount]) * 600; break;
    case 'shake': {
      const k = interpolate(frame, [0, 12], [1, 0.15], {extrapolateRight: 'clamp'});
      x = Math.sin(frame * 3.1) * 14 * k; y = Math.cos(frame * 2.3) * 10 * k; rot = Math.sin(frame * 1.7) * 0.6 * k; scale = 1.06; break;
    }
    case 'whip': {
      const e = interpolate(frame, [0, 8], [1, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
      x = e * 1400; scale = 1.04; break;
    }
  }
  const blur = move === 'whip' ? interpolate(frame, [0, 8], [18, 0], {extrapolateRight: 'clamp'}) : 0;
  return (
    <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`, filter: blur ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};
