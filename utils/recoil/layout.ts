import { atom } from 'recoil';
import { v1 } from 'uuid';
import { User, Live } from '../../types/mainType';

export const userState = atom<User>({
  key: `userState/${v1()}`,
  default: {
    intraId: '',
    isAdmin: false,
    userImageUrl: '',
  },
});

export const liveState = atom<Live>({
  key: `liveState/${v1()}`,
  default: {
    notiCount: 0,
    event: null,
    currentMatchMode: null,
    gameId: 0,
  },
});

export const openMenuBarState = atom<boolean>({
  key: `openMenuBarState/${v1()}`,
  default: false,
});

export const openNotiBarState = atom<boolean>({
  key: `openNotiBarState/${v1()}`,
  default: false,
});
