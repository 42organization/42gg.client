import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
} from 'react';

export interface HeaderContextState {
  openMenuBarState: boolean;
  openNotiBarState: boolean;
  setOpenMenuBarState: Dispatch<SetStateAction<boolean>>;
  setOpenNotiBarState: Dispatch<SetStateAction<boolean>>;
  resetOpenMenuBarState: () => void;
  resetOpenNotiBarState: () => void;
}

export const HeaderContext = createContext<HeaderContextState | null>(null);

const HeaderStateContext = (props) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [noti, setNoti] = useState<boolean>(false);

  const resetMenuHandler = (): void => {
    setMenu(false);
  };

  const resetNotiHandler = (): void => {
    setNoti(false);
  };

  const HeaderState: HeaderContextState = {
    openMenuBarState: menu,
    openNotiBarState: noti,
    setOpenMenuBarState: setMenu,
    setOpenNotiBarState: setNoti,
    resetOpenMenuBarState: resetMenuHandler,
    resetOpenNotiBarState: resetNotiHandler,
  };
  return (
    <HeaderContext.Provider value={HeaderState}>
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderStateContext;
