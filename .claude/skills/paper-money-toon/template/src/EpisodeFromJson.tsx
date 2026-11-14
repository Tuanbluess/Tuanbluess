import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Character, Expr, Look} from './components/Character';
import {CameraRig, Move} from './components/CameraRig';
import {BlackCard, Label, MoneyStack, NameTag} from './components/Overlays';
import {Particles, PopItem, SpeedLines, Transition, TransitionIn, useImpactShake, usePath} from './components/Motion';
import {SetView} from './components/Sets';
import {C, FONT} from './theme';

type Actor = {
  who: string; x: number; y: number; scale?: number; expr?: Expr; talking?: boolean; facing?: 1 | -1; enterAt?: number;
  /** Đổi biểu cảm giữa shot: [{at: 1.2, expr: "shock"}] */
  exprs?: {at: number; expr: Expr; talking?: boolean}[];
  /** Di chuyển giữa shot: [{at: 1.5, x: 0.7, y: 0.85}] */
  path?: {at: number; x: number; y: number}[];
};

export type Shot = {
  id: string;
  start: number;
  end: number;
  line?: string;
  type?: 'scene' | 'blackCard' | 'title';
  text?: string;
  set?: string;
  transition?: Transition;
  actors?: Actor[];
  props?: {kind: 'moneyStack'; x: number; y: number; bills?: number; at?: number}[];
  pops?: {content: string; x: number; y: number; at?: number; size?: number; color?: string; from?: 'scale' | 'left' | 'right' | 'top' | 'bottom'; spin?: boolean}[];
  labels?: {text: string; x: number; y: number; size?: number; color?: string; at?: number; countTo?: number; glow?: boolean}[];
  nameTag?: {name: string; role?: string; x?: number; y?: number};
  camera?: {move?: Move; amount?: number};
  particles?: 'dust' | 'money' | 'rain' | 'sparks' | 'confetti' | 'snow';
  speedLines?: boolean;
  impacts?: number[];
  sfx?: {at: number; name: string; volume?: number}[];
};
export type Storyboard = {title: string; fps: number; voice?: string; music?: string[]; cast: Record<string, Look>; shots: Shot[]};

const TitleCard: React.FC<{text: string}> = ({text}) => (
  <AbsoluteFill style={{background: C.night, justifyContent: 'center', alignItems: 'center'}}>
    <Particles kind="sparks" count={30} />
    <div style={{fontFamily: FONT, color: '#fff', fontSize: 110, textAlign: 'center', maxWidth: 1500, lineHeight: 1.05, textShadow: `0 0 30px ${C.money}`}}>{text.toUpperCase()}</div>
  </AbsoluteFill>
);

const ActorView: React.FC<{a: Actor; cast: Record<string, Look>}> = ({a, cast}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pos = usePath(a.path, a.x, a.y);
  let expr = a.expr, talking = a.talking;
  for (const e of a.exprs ?? []) if (frame >= e.at * fps) { expr = e.expr; if (e.talking !== undefined) talking = e.talking; }
  return (
    <div style={{position: 'absolute', left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, transform: 'translate(-50%,-100%)'}}>
      <Character look={cast[a.who] ?? {}} expr={expr} talking={talking} size={520 * (a.scale ?? 1)} facing={a.facing} enterAt={Math.round((a.enterAt ?? 0) * fps)} />
    </div>
  );
};

const SceneShot: React.FC<{s: Shot; cast: Record<string, Look>}> = ({s, cast}) => {
  const {fps} = useVideoConfig();
  const shake = useImpactShake(s.impacts);
  return (
    <AbsoluteFill style={{transform: shake}}>
      <CameraRig move={s.camera?.move} amount={s.camera?.amount}>
        <SetView name={s.set ?? 'night_city'} />
        {s.props?.map((p, i) => <MoneyStack key={i} x={p.x} y={p.y} bills={p.bills} at={Math.round((p.at ?? 0.2) * fps)} />)}
        {s.actors?.map((a, i) => <ActorView key={i} a={a} cast={cast} />)}
      </CameraRig>
      {s.particles && <Particles kind={s.particles} />}
      {s.speedLines && <SpeedLines />}
      {s.pops?.map((p, i) => <PopItem key={i} {...p} at={Math.round((p.at ?? 0.2) * fps)} />)}
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
          <TransitionIn type={s.type === 'blackCard' ? 'cut' : s.transition}>
            {s.type === 'blackCard' ? <BlackCard text={s.text ?? s.line ?? ''} /> : s.type === 'title' ? <TitleCard text={s.text ?? sb.title} /> : <SceneShot s={s} cast={sb.cast} />}
          </TransitionIn>
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
