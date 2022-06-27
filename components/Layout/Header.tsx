import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState, liveState } from '../../utils/recoil/main';
import { UserData, LiveData } from '../../types/mainType';
import MenuBar from './MenuBar';
import NotiBar from './NotiBar';
import { VscBell, VscBellDot, VscSmiley } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import styles from '../../styles/Layout/Header.module.scss';

export default function Header() {
  const userImg = useRecoilValue<UserData>(userState).userImageUri;
  const [liveData, setLiveData] = useRecoilState<LiveData>(liveState);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [showNotiBar, setShowNotiBar] = useState(false);
  const router = useRouter();

  const showMenuBarHandler = () => {
    setShowNotiBar(false);
    setShowMenuBar(!showMenuBar);
  };

  const showNotiBarHandler = () => {
    setShowMenuBar(false);
    setShowNotiBar(!showNotiBar);
    setLiveData((prev) => ({ ...prev, notiCount: 0 }));
  };

  const gotoHomeHandler = () => {
    setShowMenuBar(false);
    setShowNotiBar(false);
    router.push('/');
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft} onClick={showMenuBarHandler}>
          <FiMenu id={styles.menuIcon} />
        </div>
        <div id={styles.logo} onClick={gotoHomeHandler}>
          42GG
        </div>
        <div className={styles.headerRight}>
          <div id={styles.notiIcon} onClick={showNotiBarHandler}>
            {liveData.notiCount ? <VscBellDot /> : <VscBell />}
          </div>
          <div id={styles.userImg}>
            {/* <Image src={userImg} alt='prfImg' /> */}
          </div>
        </div>
      </div>
      {showMenuBar && <MenuBar showMenuBarHandler={showMenuBarHandler} />}
      {showNotiBar && <NotiBar showNotiBarHandler={showNotiBarHandler} />}
    </div>
  );
}
