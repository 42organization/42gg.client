import { atom } from 'recoil';
import { v1 } from 'uuid';
import {
  IapplicationAlertState,
  IapplicationModal,
} from 'types/takgu/recruit/recruitments';

export const applicationAlertState = atom<IapplicationAlertState>({
  key: `applicationAlertState/${v1()}`,
  default: {
    alertState: false,
    message: '',
    severity: undefined,
  },
});

export const applicationModalState = atom<IapplicationModal>({
  key: `applicationModalState/${v1()}`,
  default: {
    state: false,
    content: 'NONE',
    formData: [],
  },
});
