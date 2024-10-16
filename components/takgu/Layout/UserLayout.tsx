import { useRecoilValue } from 'recoil';
import { colorModeState } from 'utils/recoil/takgu/colorMode';
import styles from 'styles/takgu/Layout/Layout.module.scss';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const colorMode = useRecoilValue(colorModeState);

  return (
    <div className={styles.appContainer}>
      <div
        className={`${styles.background} ${
          colorMode ? styles[colorMode.toLowerCase()] : styles.basic
        } `}
      >
        <div>
          {/* TODO : 상위 div 컴포넌트 필요한지 다시 확인해보기 */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
