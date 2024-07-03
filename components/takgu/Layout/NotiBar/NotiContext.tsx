import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Noti } from 'types/notiTypes';
import useAxiosGet from 'hooks/useAxiosGet';
import useReloadHandler from 'hooks/useReloadHandler';

export interface NotiContextState {
  noti: Noti[];
  spinReloadButton: boolean;
  clickReloadNoti: boolean;
  setClickReloadNoti: Dispatch<SetStateAction<boolean>>;
}

export const NotiProvider = createContext<NotiContextState | null>(null);

interface NotiStateContextProps {
  children: React.ReactNode;
}

const NotiStateContext = (props: NotiStateContextProps) => {
  const [noti, setNoti] = useState<Noti[]>([]);
  const [clickReloadNoti, setClickReloadNoti] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);

  const getNotiHandler = useAxiosGet<any>({
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

  const NotiState: NotiContextState = {
    noti: noti,
    spinReloadButton: spinReloadButton,
    clickReloadNoti: clickReloadNoti,
    setClickReloadNoti: setClickReloadNoti,
  };

  return (
    <NotiProvider.Provider value={NotiState}>
      {props.children}
    </NotiProvider.Provider>
  );
};

export default NotiStateContext;
