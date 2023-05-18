import { useContext } from 'react';
import styles from 'styles/Layout/NotiBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import NewNotiStateContext from './NewNotiProvider';

export default function NewNotiBar() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <NewNotiStateContext>
      <div
        className={styles.backdrop}
        onClick={() => HeaderState?.resetOpenNotiBarState()}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <NewNotiStateContext.NotiCloseButton />
          <NewNotiStateContext.NotiMain />
        </div>
      </div>
    </NewNotiStateContext>
  );
}
