import { useRecoilValue } from 'recoil';
import { colorModeState } from 'utils/recoil/takgu/colorMode';

const AgendaUserLayout = ({ children }: { children: React.ReactNode }) => {
  const colorMode = useRecoilValue(colorModeState);

  return (
    <div>{children}</div>
    // TODO : css 들어오면 수정하기
    // <div className={styles.appContainer}>
    //   <div
    //     className={`${styles.background} ${
    //       colorMode ? styles[colorMode.toLowerCase()] : styles.basic
    //     } `}
    //   >
    //     <div>
    //       {/* TODO : 상위 div 컴포넌트 필요한지 다시 확인해보기 */}
    //       {children}
    //     </div>
    //   </div>
    // </div>
  );
};

export default AgendaUserLayout;
