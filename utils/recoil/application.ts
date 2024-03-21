import { atom } from 'recoil';
import { v1 } from 'uuid';
import { AlertColor } from '@mui/material';
import { IApplicantAnswer } from 'types/recruit/recruitments';

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
  content: 'APPLY' | 'CANCEL' | 'EDIT' | 'NONE';
  formData: IApplicantAnswer[];
}

export const applicationModalState = atom<IapplicationModal>({
  key: `applicationModalState/${v1()}`,
  default: {
    state: false,
    content: 'NONE',
    formData: [],
  },
});
