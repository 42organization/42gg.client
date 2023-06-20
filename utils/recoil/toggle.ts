import { ToggleMode } from 'types/rankTypes';
import { atom } from 'recoil';
import { v1 } from 'uuid';

// TODO : 삭제 예정
export const toggleState = atom<ToggleMode>({
  key: `Toggle/${v1()}`,
  default: 'RANK',
});
