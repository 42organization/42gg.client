import Link from 'next/link';
import { atom, useRecoilState } from 'recoil';
import Menubar from './Menubar';
import Notibar from './Notibar';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { FiMenu } from 'react-icons/fi';
import styles from '../styles/Header.module.scss';

export const menubarState = atom<boolean>({ key: 'menubarState', default: false });
export const notibarState = atom<boolean>({ key: 'notibarState', default: false });

export default function Header() {
  const [showMenubar, setShowMenubar] = useRecoilState(menubarState);
  const [showNotibar, setShowNotibar] = useRecoilState(notibarState);
  const notiCount = 3; // 메인에서 받아오는 노티카운트, recoil쓸 것

  const showMenubarHandler = () => {
    setShowMenubar(!showMenubar);
    setShowNotibar(false);
  };
  const showNotibarHandler = () => {
    setShowNotibar(!showNotibar);
    setShowMenubar(false);
  };

  return (
    <>
      <div className={styles.headerWrap}>
        <div onClick={showMenubarHandler}>
          <FiMenu className={styles.menuIcon} />
        </div>
        <Link href='/'>
          <div>Logo</div>
        </Link>
        <div>
          <div onClick={showNotibarHandler}>{notiCount ? <VscBellDot className={styles.notiIcon} /> : <VscBell className={styles.notiIcon} />}</div>
          <img src='/vercel.svg' alt='prfImg'></img>
        </div>
      </div>
      {showMenubar && <Menubar />}
      {showNotibar && <Notibar />}
    </>
  );
}
