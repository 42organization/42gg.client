import { useRouter } from 'next/router';
import styles from '../styles/MenuBar.module.scss';

type MenuBarProps = {
  showMenuBarHandler: () => void;
};

export default function MenuBar({ showMenuBarHandler }: MenuBarProps) {
  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    showMenuBarHandler();
    router.push(`/${path}`);
  };

  return (
    <div className={styles.shadow} onClick={showMenuBarHandler}>
      <div className={styles.menuBarWrap} onClick={(e) => e.stopPropagation()}>
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
