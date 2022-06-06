import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { menubarState as menubarState } from './Header';
import styles from '../styles/Menubar.module.scss';

export default function Menubar() {
  const [showMenubar, setShowMenubar] = useRecoilState<boolean>(menubarState);
  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    setShowMenubar(false);
    router.push(`/${path}`);
  };

  return (
    <div className={styles.shadow} onClick={() => setShowMenubar(false)}>
      <div className={styles.menubarWrap} onClick={(e) => e.stopPropagation()}>
        <nav>
          <ul>
            <li onClick={() => MenuPathHandler('rank')}>Ranking</li>
            <li onClick={() => MenuPathHandler('game')}>Game Results</li>
            <li onClick={() => MenuPathHandler('')}>My Profile</li>
          </ul>
        </nav>
        <nav>
          <ul id={styles.subMenu}>
            <li>매뉴얼</li>
            <li>로그아웃</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
