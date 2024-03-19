import { atom } from 'recoil';
import { v1 } from 'uuid';
import {
  IApplicantAnswer,
  IUserApplicationInfo,
} from 'types/recruit/recruitments';

export const userApplicationInfoState = atom<IUserApplicationInfo>({
  key: `userApplicationInfoState/${v1()}`,
  default: {
    applicationId: 0,
    endDate: '',
    title: '',
    content: '',
  },
});

export const userApplicationAnswerState = atom<IApplicantAnswer[]>({
  key: `userApplicationAnswerState/${v1()}`,
  default: [],
});

export const applicationAlertState = atom<boolean>({
  key: `applicationAlertState/${v1()}`,
  default: false,
});

export interface IapplicationModal {
  state: boolean;
  content: 'APPLY' | 'CANCEL' | 'UPDATE' | 'NONE';
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
