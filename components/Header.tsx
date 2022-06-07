import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../utils/atom';
import Menubar from './Menubar';
import Notibar from './Notibar';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import styles from '../styles/Header.module.scss';

export default function Header() {
  const [showMenubar, setShowMenubar] = useState(false);
  const [showNotibar, setShowNotibar] = useState(false);
  const notiCount = useRecoilValue(userState)?.notiCount;
  const userImg = useRecoilValue(userState)?.userImageUri;
  const router = useRouter();

  const showMenubarHandler = () => {
    setShowNotibar(false);
    setShowMenubar(!showMenubar);
  };
  const showNotibarHandler = () => {
    setShowMenubar(false);
    setShowNotibar(!showNotibar);
  };
  const gotoHomeHandler = () => {
    setShowMenubar(false);
    setShowNotibar(false);
    router.push('/');
  };

  return (
    <div>
      <div className={styles.headerWrap}>
        <div onClick={showMenubarHandler}>
          <FiMenu id={styles.menuIcon} />
        </div>
        <div id={styles.logo} onClick={gotoHomeHandler}>
          Logo
        </div>
        <div className={styles.headerRight}>
          <div onClick={showNotibarHandler}>{notiCount ? <VscBellDot id={styles.notiIcon} /> : <VscBell id={styles.notiIcon} />}</div>
          <img src={userImg} alt='prfImg' /> {/* next js 에서 image는 다시 알아봐야 함 */}
        </div>
      </div>
      {showMenubar && <Menubar showMenubarHandler={showMenubarHandler} />}
      {showNotibar && <Notibar showNotibarHandler={showNotibarHandler} />}
    </div>
  );
}
