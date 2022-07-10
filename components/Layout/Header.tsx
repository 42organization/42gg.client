import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  showMenuBarState,
  showNotiBarState,
  userState,
  liveState,
} from 'utils/recoil/layout';
import MenuBar from './MenuBar';
import NotiBar from './NotiBar';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import styles from 'styles/Layout/Header.module.scss';

export default function Header() {
  const userData = useRecoilValue(userState);
  const [liveData, setLiveData] = useRecoilState(liveState);
  const [showMenuBar, setShowMenuBar] = useRecoilState(showMenuBarState);
  const [showNotiBar, setShowNotiBar] = useRecoilState(showNotiBarState);
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
          <div>42GG</div>
        </div>
        <div className={styles.headerRight}>
          <div id={styles.notiIcon} onClick={showNotiBarHandler}>
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
                  src={userData.userImageUri}
                  alt='prfImg'
                  layout='fill'
                  objectFit='cover'
                  sizes='20vw'
                  quality='20'
                />
              )}
            </div>
          </Link>
        </div>
      </div>
      {showMenuBar && <MenuBar showMenuBarHandler={showMenuBarHandler} />}
      {showNotiBar && <NotiBar showNotiBarHandler={showNotiBarHandler} />}
    </div>
  );
}
