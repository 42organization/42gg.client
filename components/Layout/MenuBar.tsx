import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/recoil/main';
import { UserData } from '../../types/mainType';
import styles from '../../styles/MenuBar.module.scss';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../utils/recoil/login';

type MenuBarProps = {
  showMenuBarHandler: () => void;
};

export default function MenuBar({ showMenuBarHandler }: MenuBarProps) {
  const userData = useRecoilValue<UserData>(userState);
  const setIsLoggedIn = useSetRecoilState(loginState);

  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    showMenuBarHandler();
    router.push(`/${path}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem('42gg-token');
    setIsLoggedIn(false);
    router.push(`/`);
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
            <li onClick={logoutHandler}>로그아웃</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
