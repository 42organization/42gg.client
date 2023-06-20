import { ToggleMode } from 'types/rankTypes';
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const toggleState = atom<ToggleMode>({
  key: `Toggle/${v1()}`,
  default: 'RANK',
});
