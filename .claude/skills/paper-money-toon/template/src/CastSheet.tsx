import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Character, Look} from './components/Character';
import {FONT} from './theme';
import presets from '../cast/presets.json';

/** Xem trước toàn bộ nhân vật trong cast/presets.json. */
export const CastSheet: React.FC = () => {
  const entries = Object.entries(presets).filter(([k]) => !k.startsWith('_')) as [string, Look][];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#1b1f3a,#0d1022)', flexDirection: 'row', flexWrap: 'wrap', padding: 30, gap: 10, alignContent: 'flex-start'}}>
      {entries.map(([name, look]) => (
        <div key={name} style={{width: 300, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Character look={look} expr="neutral" size={400} enterAt={-1000} />
          <div style={{fontFamily: FONT, color: '#fff', fontSize: 30}}>{name}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
