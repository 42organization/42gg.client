import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Live } from 'types/mainType';
import {
  liveState,
  openMenuBarState,
  openNotiBarState,
} from 'utils/recoil/layout';

type useHeaderHandlerReturn = [boolean, boolean, () => void, () => void];

const useHeaderHandler = (): useHeaderHandlerReturn => {
  const [openMenuBar, setOpenMenuBar] =
    useRecoilState<boolean>(openMenuBarState);
  const [openNotiBar, setOpenNotiBar] =
    useRecoilState<boolean>(openNotiBarState);
  const setLive = useSetRecoilState<Live>(liveState);

  const openMenuBarHandler = (): void => {
    setOpenMenuBar(!openMenuBar);
  };

  const openNotiBarHandler = (): void => {
    setOpenNotiBar(!openNotiBar);
    setLive((prev) => ({ ...prev, notiCount: 0 }));
  };

  useEffect(() => {
    document.body.style.overflow =
      openMenuBar || openNotiBar ? 'hidden' : 'unset';
  }, [openMenuBar, openNotiBar]);

  return [openMenuBar, openNotiBar, openMenuBarHandler, openNotiBarHandler];
};

export default useHeaderHandler;
