import { ToggleMode } from 'types/rankTypes';
import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

export const toggleState = atom<ToggleMode>({
  key: `Toggle/${v1()}`,
  default: 'RANK',
});

/* export const ToggleSelector = selector({
	key: 'toggleSelector',
	get: ({get}) => {
		const toggle = get(toggleState);
		if (toggle === 'RANK') {
			return get('RANK')
		} else {
			return get('NORMAL');
		}
	}
}); */
