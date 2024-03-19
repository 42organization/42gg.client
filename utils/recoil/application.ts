import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';
import { AlertColor } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  IUserApplicationInfo,
} from 'types/recruit/recruitments';

const { persistAtom } = recoilPersist();

export const userApplicationInfoState = atom<IUserApplicationInfo>({
  key: `userApplicationInfoState/${v1()}`,
  default: {
    applicationId: 0,
    endDate: '',
    title: '',
    content: '',
  },
});

export const applicationFormTypeState = atom<ApplicationFormType>({
  key: `applicationFormTypeState/${v1()}`,
  default: 'APPLY',
  effects_UNSTABLE: [persistAtom],
});

export const userApplicationAnswerState = atom<IApplicantAnswer[]>({
  key: `userApplicationAnswerState/${v1()}`,
  default: [],
});

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

export interface IapplicationInfo {
  recruitId: number;
  applicationId?: number;
}

export const userApplicationInfo = atom<IapplicationInfo>({
  key: `userApplicationInfo/${v1()}`,
  default: {
    recruitId: 0,
    applicationId: 0,
  },
});
