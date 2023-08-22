import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { MatchMode } from 'types/mainType';
import { ToggleMode } from 'types/rankTypes';

export const colorModeState = atom<MatchMode>({
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
