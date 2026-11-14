import {loadFont} from '@remotion/google-fonts/Caveat';

let family = 'Caveat, "Comic Sans MS", cursive';
try {
  family = `${loadFont().fontFamily}, "Comic Sans MS", cursive`;
} catch {
  // offline: fall back to system cursive
}

export const FONT = family;

export const C = {
  ink: '#1d1b22',
  money: '#5CFF3B',
  moneyDeep: '#1f7a2c',
  danger: '#E0262E',
  navy: '#1c2a4a',
  paper: '#f4ecd8',
  skin: '#F2C9A0',
  night: '#0d1022',
};
