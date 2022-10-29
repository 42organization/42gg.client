import { atom } from 'recoil';
import { v1 } from 'uuid';
import { User, Live } from '../../types/mainType';

export const userState = atom<User>({
  key: `userState/${v1()}`,
  default: {
    intraId: '',
    isAdmin: false,
    userImageUri: '',
    seasonMode: 'normal',
  },
});

export const liveState = atom<Live>({
  key: `liveState/${v1()}`,
  default: {
    notiCount: 0,
    event: null,
    seasonMode: 'normal',
    currentMatchMode: null,
  },
});

export const menuBarState = atom<boolean>({
  key: `menuBarState/${v1()}`,
  default: false,
});

export const notiBarState = atom<boolean>({
  key: `notiBarState/${v1()}`,
  default: false,
});
