import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { ColorMode } from 'types/colorModeTypes';
import { ToggleMode } from 'types/rankTypes';

export const colorModeState = atom<ColorMode>({
  key: `ColorMode/${v1()}`,
  default: 'RANK',
});

export const colorToggleSelector = selector<ToggleMode>({
  key: `ColorToggle/${v1()}`,
  get: ({ get }) => {
    const mode = get(colorModeState);
    return mode === 'NORMAL' ? 'NORMAL' : 'RANK';
  },
  set: ({ set }, newMode) => {
    set(colorModeState, newMode);
  },
});
