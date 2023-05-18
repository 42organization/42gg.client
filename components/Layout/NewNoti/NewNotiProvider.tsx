import { Dispatch, SetStateAction, createContext } from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Noti } from 'types/notiTypes';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import { NotiCloseButton, NotiMain } from './NewNotiElements';

export interface NewNotiContextState {
  noti: Noti[];
  spinReloadButton: boolean;
  clickReloadNoti: boolean;
  setClickReloadNoti: Dispatch<SetStateAction<boolean>>;
  getNotiHandler: () => Promise<void>;
}

export const NewNotiContext = createContext<NewNotiContextState | null>(null);

const NewNotiStateContext = (props) => {
  const [noti, setNoti] = useState<Noti[]>([]);
  const [clickReloadNoti, setClickReloadNoti] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);
  const setError = useSetRecoilState(errorState);

  const getNotiHandler = async () => {
    if (clickReloadNoti) {
      setSpinReloadButton(true);
      setTimeout(() => {
        setSpinReloadButton(false);
      }, 1000);
    }
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNoti(res?.data.notifications);
      setClickReloadNoti(false);
    } catch (e) {
      setError('JB04');
    }
  };

  const NewNotiState: NewNotiContextState = {
    noti: noti,
    spinReloadButton: spinReloadButton,
    clickReloadNoti: clickReloadNoti,
    setClickReloadNoti: setClickReloadNoti,
    getNotiHandler: getNotiHandler,
  };

  return (
    <NewNotiContext.Provider value={NewNotiState}>
      {props.children}
    </NewNotiContext.Provider>
  );
};

NewNotiStateContext.NotiCloseButton = NotiCloseButton;
NewNotiStateContext.NotiMain = NotiMain;

export default NewNotiStateContext;
