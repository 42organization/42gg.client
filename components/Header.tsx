import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../utils/recoil/main';
import { UserData } from '../types/mainType';
import MenuBar from './MenuBar';
import NotiBar from './NotiBar';
import { VscBell, VscBellDot, VscSmiley } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import styles from '../styles/Header.module.scss';
import { getData } from '../utils/axios';

export default function Header() {
  const [userData, setUserData] = useRecoilState<UserData | null>(userState);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [showNotiBar, setShowNotiBar] = useState(false);
  const notiCount = userData?.notiCount;
  const userImg = userData?.userImageUri;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/users`);
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const showMenuBarHandler = () => {
    setShowNotiBar(false);
    setShowMenuBar(!showMenuBar);
  };
  const showNotiBarHandler = () => {
    setShowMenuBar(false);
    setShowNotiBar(!showNotiBar);
  };
  const gotoHomeHandler = () => {
    setShowMenuBar(false);
    setShowNotiBar(false);
    router.push('/');
  };

  return (
    <div>
      <div className={styles.headerWrap}>
        <div onClick={showMenuBarHandler}>
          <FiMenu id={styles.menuIcon} />
        </div>
        <div id={styles.logo} onClick={gotoHomeHandler}>
          Logo
        </div>
        <div className={styles.headerRight}>
          <div onClick={showNotiBarHandler}>
            {notiCount ? (
              <VscBellDot id={styles.notiIcon} />
            ) : (
              <VscBell id={styles.notiIcon} />
            )}
          </div>
          {userImg ? (
            <img src={userImg} alt='prfImg' />
          ) : (
            <VscSmiley id={styles.userIcon} />
          )}
          {/* next js 에서 image는 다시 알아봐야 함 */}
        </div>
      </div>
      {showMenuBar && <MenuBar showMenuBarHandler={showMenuBarHandler} />}
      {showNotiBar && <NotiBar showNotiBarHandler={showNotiBarHandler} />}
    </div>
  );
}
