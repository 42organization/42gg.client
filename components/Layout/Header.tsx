import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  menuBarState,
  notiBarState,
  userState,
  liveState,
} from 'utils/recoil/layout';
import MenuBar from './MenuBar';
import NotiBar from './NotiBar';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import fallBack from 'public/image/fallBackSrc.jpeg';
import styles from 'styles/Layout/Header.module.scss';

export default function Header() {
  const userData = useRecoilValue(userState);
  const [liveData, setLiveData] = useRecoilState(liveState);
  const [openMenuBar, setOpenMenuBar] = useRecoilState(menuBarState);
  const [openNotiBar, setOpenNotiBar] = useRecoilState(notiBarState);
  const [imgError, setImgError] = useState(false);

  const openMenuBarHandler = () => {
    setOpenMenuBar(!openMenuBar);
  };

  const openNotiBarHandler = () => {
    setOpenNotiBar(!openNotiBar);
    setLiveData((prev) => ({ ...prev, notiCount: 0 }));
  };

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
            {liveData.notiCount ? (
              <div className={styles.bellWhole}>
                <VscBellDot />
              </div>
            ) : (
              <VscBell />
            )}
          </div>
          <Link href={`/users/detail?intraId=${userData.intraId}`}>
            <div className={styles.userImage}>
              {userData.userImageUri && (
                <Image
                  src={imgError ? fallBack : userData.userImageUri}
                  alt='prfImg'
                  layout='fill'
                  objectFit='cover'
                  sizes='20vw'
                  quality='20'
                  unoptimized={imgError ? true : false}
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </Link>
        </div>
      </div>
      {openMenuBar && <MenuBar />}
      {openNotiBar && <NotiBar />}
    </div>
  );
}
