import { useRouter } from 'next/router';
import styles from '../styles/Menubar.module.scss';

type MenubarProps = {
  showMenubarHandler: () => void;
};

export default function Menubar({ showMenubarHandler }: MenubarProps) {
  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    showMenubarHandler();
    router.push(`/${path}`);
  };

  return (
    <div className={styles.shadow} onClick={showMenubarHandler}>
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
