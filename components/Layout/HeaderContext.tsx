import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
} from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export interface HeaderContextState {
  openMenuBarState: boolean;
  openNotiBarState: boolean;
  setOpenMenuBarState: Dispatch<SetStateAction<boolean>>;
  setOpenNotiBarState: Dispatch<SetStateAction<boolean>>;
  resetOpenMenuBarState: () => void;
  resetOpenNotiBarState: () => void;
  putNotiHandler: () => Promise<void>;
}

export const HeaderContext = createContext<HeaderContextState | null>(null);

interface HeaderStateContextProps {
  children: React.ReactNode;
}

const HeaderStateContext = (props: HeaderStateContextProps) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [noti, setNoti] = useState<boolean>(false);
  const setError = useSetRecoilState(errorState);

  const resetMenuHandler = () => {
    setMenu(false);
  };

  const putNotiHandler = async () => {
    try {
      await instance.put(`/pingpong/notifications/check`);
    } catch (e) {
      setError('JB05');
    }
  };

  const resetNotiHandler = () => {
    putNotiHandler();
    setNoti(false);
  };

  const HeaderState: HeaderContextState = {
    openMenuBarState: menu,
    openNotiBarState: noti,
    setOpenMenuBarState: setMenu,
    setOpenNotiBarState: setNoti,
    resetOpenMenuBarState: resetMenuHandler,
    resetOpenNotiBarState: resetNotiHandler,
    putNotiHandler: putNotiHandler,
  };
  return (
    <HeaderContext.Provider value={HeaderState}>
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderStateContext;
