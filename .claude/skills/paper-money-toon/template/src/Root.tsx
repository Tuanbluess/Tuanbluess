import React from 'react';
import {Composition, Still} from 'remotion';
import {EpisodeFromJson, Storyboard} from './EpisodeFromJson';
import {Thumbnail, ThumbSpec} from './Thumbnail';
import {CastSheet} from './CastSheet';
import demo from '../storyboard/demo.json';
import thumb from '../storyboard/demo.thumb.json';

const sb = demo as unknown as Storyboard;
const dur = Math.ceil(sb.shots[sb.shots.length - 1].end * sb.fps);

export const Root: React.FC = () => (
  <>
    <Composition id="Episode" component={EpisodeFromJson} durationInFrames={dur} fps={sb.fps} width={1920} height={1080} defaultProps={{sb}} />
    <Still id="Thumbnail" component={Thumbnail} width={1280} height={720} defaultProps={{spec: thumb as unknown as ThumbSpec}} />
    <Still id="CastSheet" component={CastSheet} width={1920} height={1080} />
  </>
);
