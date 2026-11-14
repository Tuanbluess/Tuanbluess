import React from 'react';
import {Composition} from 'remotion';
import {EpisodeFromJson, Storyboard} from './EpisodeFromJson';
import demo from '../storyboard/demo.json';

const sb = demo as unknown as Storyboard;
const dur = Math.ceil(sb.shots[sb.shots.length - 1].end * sb.fps);

export const Root: React.FC = () => (
  <Composition id="Episode" component={EpisodeFromJson} durationInFrames={dur} fps={sb.fps} width={1920} height={1080} defaultProps={{sb}} />
);
