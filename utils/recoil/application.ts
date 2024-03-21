import { atom } from 'recoil';
import { v1 } from 'uuid';
import { AlertColor } from '@mui/material';
import {} from 'types/recruit/recruitments';

export interface IapplicationAlertState {
  alertState: boolean;
  message: string;
  severity: AlertColor | undefined;
}

export const applicationAlertState = atom<IapplicationAlertState>({
  key: `applicationAlertState/${v1()}`,
  default: {
    alertState: false,
    message: '',
    severity: undefined,
  },
});

export interface IapplicationModal {
  state: boolean;
  content: 'APPLY' | 'CANCEL' | 'NONE';
}

export const applicationModalState = atom<IapplicationModal>({
  key: `applicationModalState/${v1()}`,
  default: {
    state: false,
    content: 'NONE',
  },
});

export const applicationInvalidInput = atom<number>({
  key: `applicationInvalidInput/${v1()}`,
  default: -1,
});
