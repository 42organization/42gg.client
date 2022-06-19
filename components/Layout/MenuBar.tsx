import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/recoil/main';
import { UserData } from '../../types/mainType';
import styles from '../../styles/MenuBar.module.scss';

type MenuBarProps = {
  showMenuBarHandler: () => void;
};

export default function MenuBar({ showMenuBarHandler }: MenuBarProps) {
  const userData = useRecoilValue<UserData>(userState);
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
            <li onClick={() => MenuPathHandler('rank')}>랭킹</li>
            <li onClick={() => MenuPathHandler('game')}>최근 경기</li>
            <li onClick={() => MenuPathHandler(`users/${userData.userId}`)}>
              내 정보
            </li>
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
