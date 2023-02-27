import { atom } from 'recoil';
import { v1 } from 'uuid';
import { AlertColor } from '@mui/material';

interface Toast {
  toastName: string | null;
  severity?: AlertColor;
  message?: string;
  clicked?: boolean;
}

export const toastState = atom<Toast>({
  key: `toastState/${v1()}`,
  default: { toastName: null },
});
