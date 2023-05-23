import { Dispatch, SetStateAction, createContext } from 'react';
import { useState, useEffect } from 'react';
import { Noti } from 'types/notiTypes';
import useReloadHandler from 'hooks/useReloadHandler';
import useAxiosGet from 'hooks/useAxiosGet';
import { NotiCloseButton, NotiMain } from './NewNotiElements';

export interface NewNotiContextState {
  noti: Noti[];
  spinReloadButton: boolean;
  clickReloadNoti: boolean;
  setClickReloadNoti: Dispatch<SetStateAction<boolean>>;
}

export const NewNotiContext = createContext<NewNotiContextState | null>(null);

interface NewNotiStateContextProps {
  children: React.ReactNode;
}

const NewNotiStateContext = (props: NewNotiStateContextProps) => {
  const [noti, setNoti] = useState<Noti[]>([]);
  const [clickReloadNoti, setClickReloadNoti] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);

  const getNotiHandler = useAxiosGet({
    url: '/pingpong/notifications',
    setState: (data) => {
      setNoti(data.notifications);
    },
    err: 'JB04',
    type: 'setError',
  });

  const reloadNotiHandler = useReloadHandler({
    setSpinReloadButton: setSpinReloadButton,
    setState: setClickReloadNoti,
    state: false,
  });

  useEffect(() => {
    getNotiHandler();
  }, []);

  useEffect(() => {
    if (clickReloadNoti) {
      reloadNotiHandler();
      getNotiHandler();
    }
  }, [clickReloadNoti]);

  const NewNotiState: NewNotiContextState = {
    noti: noti,
    spinReloadButton: spinReloadButton,
    clickReloadNoti: clickReloadNoti,
    setClickReloadNoti: setClickReloadNoti,
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
