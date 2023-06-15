import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { liveState } from 'utils/recoil/layout';
import { useEffect } from 'react';
import MenuBar from './MenuBar/MenuBar';
import { FiMenu } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import styles from 'styles/Layout/Header.module.scss';
import NotiBar from './NotiBar/NotiBar';
import { HeaderContextState, HeaderContext } from './HeaderContext';
import { useContext } from 'react';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import useAxiosGet from 'hooks/useAxiosGet';
import NotiBell from 'public/image/noti_bell.svg';

export default function Header() {
  const [live, setLive] = useRecoilState(liveState);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const openMenuBarHandler = () => {
    HeaderState?.setOpenMenuBarState(!HeaderState?.openMenuBarState);
  };
  const openNotiBarHandler = () => {
    HeaderState?.setOpenNotiBarState(!HeaderState?.openNotiBarState);
    setLive((prev) => ({ ...prev, notiCount: 0 }));
  };

  useEffect(() => {
    setMenuOutsideScroll();
  }, [HeaderState?.openMenuBarState, HeaderState?.openNotiBarState]);

  const setMenuOutsideScroll = () =>
    (document.body.style.overflow =
      HeaderState?.openMenuBarState || HeaderState?.openNotiBarState
        ? 'hidden'
        : 'unset');

  const setModal = useSetRecoilState<Modal>(modalState);

  const getAnnouncementHandler = useAxiosGet({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          <FiMenu
            className={styles.menuIcon}
            size='21'
            onClick={openMenuBarHandler}
          />
        </div>
        <Link className={styles.logoWrap} href={'/'}>
          42GG
        </Link>
        <div className={styles.headerRight}>
          <div
            className={styles.announceIcon}
            onClick={() => getAnnouncementHandler()}
          >
            <BsMegaphone size='21' />
          </div>
          <div className={styles.notiIcon} onClick={openNotiBarHandler}>
            {live.notiCount ? (
              <div className={styles.bellWhole}>
                <div className={styles.notiBellWrapper}>
                  <div className={styles.notiCountCircle}>
                    <div className={styles.notiCount}>
                      {live.notiCount > 9 ? '9+' : live.notiCount}
                    </div>
                  </div>
                  <NotiBell />
                </div>
              </div>
            ) : (
              <div className={styles.notiBellWrapper}>
                <NotiBell />
              </div>
            )}
          </div>
        </div>
      </div>
      {HeaderState?.openMenuBarState && <MenuBar />}
      {HeaderState?.openNotiBarState && <NotiBar />}
    </div>
  );
}
