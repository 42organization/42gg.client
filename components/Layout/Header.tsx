import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import MenuBar from './MenuBar/MenuBar';
import NotiBar from './NotiBar/NotiBar';
import { HeaderContextState, HeaderContext } from './HeaderContext';
import useAxiosGet from 'hooks/useAxiosGet';
import { FiMenu } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import styles from 'styles/Layout/Header.module.scss';
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

  const getAnnouncementHandler = useAxiosGet<any>({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
          isAttended: true,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          <FiMenu className={styles.menuIcon} onClick={openMenuBarHandler} />
        </div>
        <Link className={styles.logoWrap} href={'/'}>
          42GG
        </Link>
        <div className={styles.headerRight}>
          <div
            className={styles.announceIcon}
            onClick={() => getAnnouncementHandler()}
          >
            <BsMegaphone className={styles.megaphoneIcon} />
          </div>
          <div className={styles.notiIconWrapper} onClick={openNotiBarHandler}>
            {live.notiCount ? (
              <div className={styles.bellWhole}>
                <div className={styles.notiBellWrapper}>
                  <div className={styles.notiCountCircle}>
                    <div className={styles.notiCount}>
                      {live.notiCount > 9 ? '9+' : live.notiCount}
                    </div>
                  </div>
                  <NotiBell className={styles.bellIcon} />
                </div>
              </div>
            ) : (
              <div className={styles.notiBellWrapper}>
                <NotiBell className={styles.bellIcon} />
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
