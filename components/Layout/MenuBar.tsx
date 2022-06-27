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
    <div className={styles.backdrop} onClick={showMenuBarHandler}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button onClick={showMenuBarHandler}>&#10005;</button>
        <nav>
          <div className={styles.menu}>
            <div onClick={() => MenuPathHandler('rank')}>랭킹</div>
            <div onClick={() => MenuPathHandler('game')}>최근 경기</div>
            <div onClick={() => MenuPathHandler(`users/${userData.userId}`)}>
              내 정보
            </div>
          </div>
          <div className={styles.subMenu}>
            <div>매뉴얼</div>
            <div onClick={logoutHandler}>로그아웃</div>
          </div>
        </nav>
      </div>
    </div>
  );
}
