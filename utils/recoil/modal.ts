import { atom, selector } from 'recoil';
import { v1 } from 'uuid';
import { Modal } from 'types/modalTypes';

export const modalState = atom<Modal>({
  key: `modalState/${v1()}`,
  default: { modalName: null },
});

export const modalTypeState = selector<string>({
  key: `modalTypeState/${v1()}`,
  get: ({ get }) => {
    let modalType = '';
    const normalPrefixes = ['EVENT', 'MENU', 'MATCH', 'USER', 'FIXED'];
    const storePrefixes = ['COIN', 'STORE', 'PURCHASE', 'USE', 'EDIT'];
    const tournamentPrefixes = ['TOURNAMENT'];
    const prefix = get(modalState).modalName?.split('-')[0] || '';

    if (normalPrefixes.includes(prefix)) {
      modalType = 'NORMAL';
    } else if (storePrefixes.includes(prefix)) {
      modalType = 'STORE';
    } else if (tournamentPrefixes.includes(prefix)) {
      modalType = 'TOURNAMENT';
    } else if (prefix === 'ADMIN') {
      modalType = 'ADMIN';
    } else if (prefix === 'PARTY') {
      modalType = 'PARTY';
    }
    return modalType;
  },
});
