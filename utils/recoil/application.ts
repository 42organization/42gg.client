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
