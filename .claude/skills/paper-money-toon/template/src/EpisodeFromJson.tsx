import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Character, Expr, Look} from './components/Character';
import {CameraRig, Move} from './components/CameraRig';
import {BlackCard, Label, MoneyStack, NameTag} from './components/Overlays';
import {SetView} from './components/Sets';
import {C, FONT} from './theme';

export type Shot = {
  id: string;
  start: number;
  end: number;
  line?: string;
  type?: 'scene' | 'blackCard' | 'title';
  text?: string;
  set?: string;
  actors?: {who: string; x: number; y: number; scale?: number; expr?: Expr; talking?: boolean; facing?: 1 | -1; enterAt?: number}[];
  props?: {kind: 'moneyStack'; x: number; y: number; bills?: number; at?: number}[];
  labels?: {text: string; x: number; y: number; size?: number; color?: string; at?: number; countTo?: number; glow?: boolean}[];
  nameTag?: {name: string; role?: string; x?: number; y?: number};
  camera?: {move?: Move; amount?: number};
  sfx?: {at: number; name: string; volume?: number}[];
};
export type Storyboard = {title: string; fps: number; voice?: string; music?: string[]; cast: Record<string, Look>; shots: Shot[]};

const TitleCard: React.FC<{text: string}> = ({text}) => (
  <AbsoluteFill style={{background: C.night, justifyContent: 'center', alignItems: 'center'}}>
    <div style={{fontFamily: FONT, color: '#fff', fontSize: 110, textAlign: 'center', maxWidth: 1500, lineHeight: 1.05, textShadow: `0 0 30px ${C.money}`}}>{text.toUpperCase()}</div>
  </AbsoluteFill>
);

const SceneShot: React.FC<{s: Shot; cast: Record<string, Look>}> = ({s, cast}) => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <CameraRig move={s.camera?.move} amount={s.camera?.amount}>
        <SetView name={s.set ?? 'night_city'} />
        {s.props?.map((p, i) => <MoneyStack key={i} x={p.x} y={p.y} bills={p.bills} at={Math.round((p.at ?? 0.2) * fps)} />)}
        {s.actors?.map((a, i) => (
          <div key={i} style={{position: 'absolute', left: `${a.x * 100}%`, top: `${a.y * 100}%`, transform: 'translate(-50%,-100%)'}}>
            <Character look={cast[a.who] ?? {}} expr={a.expr} talking={a.talking} size={520 * (a.scale ?? 1)} facing={a.facing} enterAt={Math.round((a.enterAt ?? 0) * fps)} />
          </div>
        ))}
      </CameraRig>
      {s.labels?.map((l, i) => <Label key={i} {...l} at={Math.round((l.at ?? 0.15) * fps)} />)}
      {s.nameTag && <NameTag {...s.nameTag} />}
    </AbsoluteFill>
  );
};

export const EpisodeFromJson: React.FC<{sb: Storyboard}> = ({sb}) => {
  const {fps} = useVideoConfig();
  const f = (sec: number) => Math.round(sec * fps);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {sb.shots.map((s) => (
        <Sequence key={s.id} from={f(s.start)} durationInFrames={Math.max(1, f(s.end) - f(s.start))} name={`${s.id} ${s.line ?? ''}`}>
          {s.type === 'blackCard' ? <BlackCard text={s.text ?? s.line ?? ''} /> : s.type === 'title' ? <TitleCard text={s.text ?? sb.title} /> : <SceneShot s={s} cast={sb.cast} />}
          {s.sfx?.map((x, i) => (
            <Sequence key={i} from={f(x.at)} layout="none">
              <Audio src={staticFile(`sfx/${x.name}.wav`)} volume={x.volume ?? 0.6} />
            </Sequence>
          ))}
        </Sequence>
      ))}
      {sb.voice && <Audio src={staticFile(sb.voice)} />}
      {sb.music?.[0] && <Audio src={staticFile(sb.music[0])} volume={0.12} loop />}
    </AbsoluteFill>
  );
};
