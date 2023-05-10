import Link from 'next/link';
import { SetStateAction, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  openMenuBarState,
  openNotiBarState,
  userState,
  liveState,
} from 'utils/recoil/layout';
import MenuBar from './MenuBar';
import NotiBar from './NotiBar';
import PlayerImage from 'components/PlayerImage';
import { FiMenu } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import styles from 'styles/Layout/Header.module.scss';

import { HeaderContext } from './HeaderContext';
import { useContext } from 'react';

export default function Header() {
  const user = useRecoilValue(userState);
  const [live, setLive] = useRecoilState(liveState);
  // const [openMenuBar, setOpenMenuBar] = useRecoilState(openMenuBarState);
  // const [openNotiBar, setOpenNotiBar] = useRecoilState(openNotiBarState);

  const info = useContext(HeaderContext);
  console.log(info);

  // const openMenuBarHandler = () => {
  //   setOpenMenuBar(!openMenuBar);
  // };
  const openMenuBarHandler = () => {
    info.setMenu(!info.menu);
  };

  // const openNotiBarHandler = () => {
  //   setOpenNotiBar(!openNotiBar);
  //   setLive((prev) => ({ ...prev, notiCount: 0 }));
  // };
  const openNotiBarHandler = () => {
    info.setNoti(!info.noti);
    setLive((prev) => ({ ...prev, notiCount: 0 }));
  };

  // useEffect(() => {
  //   setMenuOutsideScroll();
  // }, [openMenuBar, openNotiBar]);

  // const setMenuOutsideScroll = () =>
  //   (document.body.style.overflow =
  //     openMenuBar || openNotiBar ? 'hidden' : 'unset');
  useEffect(() => {
    setMenuOutsideScroll();
  }, [info.menu, info.noti]);

  const setMenuOutsideScroll = () =>
    (document.body.style.overflow =
      info.menu || info.noti ? 'hidden' : 'unset');

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft} onClick={openMenuBarHandler}>
          <FiMenu id={styles.menuIcon} />
        </div>
        <div id={styles.logo}>
          <Link href={'/'}>
            <div>42GG</div>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <div
            id={styles.announceIcon}
            onClick={() =>
              window.open(
                'https://far-moonstone-7ff.notion.site/91925f9c945340c6a139f64fb849990d'
              )
            }
          >
            <BsMegaphone />
          </div>
          <div id={styles.notiIcon} onClick={openNotiBarHandler}>
            {live.notiCount ? (
              <div className={styles.bellWhole}>
                <VscBellDot />
              </div>
            ) : (
              <VscBell />
            )}
          </div>
          <Link href={`/users/detail?intraId=${user.intraId}`}>
            <a>
              <PlayerImage
                src={user.userImageUri}
                styleName={'header'}
                size={20}
              />
            </a>
          </Link>
        </div>
      </div>
      {info.menu && <MenuBar />}
      {info.noti && <NotiBar />}
    </div>
  );
}
