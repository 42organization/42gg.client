import { useContext } from 'react';
import styles from 'styles/Layout/NotiBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import NotiStateContext from './NotiContext';

export default function NotiBar() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <NotiStateContext>
      <div
        className={styles.backdrop}
        onClick={() => HeaderState?.resetOpenNotiBarState()}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <NotiStateContext.NotiCloseButton />
          <NotiStateContext.NotiMain />
        </div>
      </div>
    </NotiStateContext>
  );
}
