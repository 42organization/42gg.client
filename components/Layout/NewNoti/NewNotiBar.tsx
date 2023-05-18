import { useEffect, useContext } from 'react';
import styles from 'styles/Layout/NotiBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import NewNotiStateContext, {
  NewNotiContextState,
  NewNotiContext,
} from './NewNotiProvider';

export default function NewNotiBar() {
  const NotiContext = useContext<NewNotiContextState | null>(NewNotiContext);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  useEffect(() => {
    NotiContext?.getNotiHandler();
  }, []);

  useEffect(() => {
    if (NotiContext?.clickReloadNoti) NotiContext?.getNotiHandler();
  }, [NotiContext?.clickReloadNoti]);

  return (
    <div
      className={styles.backdrop}
      onClick={() => HeaderState?.resetOpenNotiBarState()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <NewNotiStateContext.NotiCloseButton />
        <NewNotiStateContext.NotiMain />
      </div>
    </div>
  );
}
