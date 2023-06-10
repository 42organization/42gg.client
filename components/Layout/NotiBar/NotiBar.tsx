import { useContext } from 'react';
import styles from 'styles/Layout/NotiBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import NotiStateContext from './NotiContext';
import { NotiContextState, NotiProvider } from './NotiContext';
import NotiItem from './NotiItem';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { instance } from 'utils/axios';

export default function NotiBar() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return (
    <div
      className={styles.backdrop}
      onClick={() => HeaderState?.resetOpenNotiBarState()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonWrapper}>
          <button onClick={() => HeaderState?.resetOpenNotiBarState()}>
            &#10005;
          </button>
        </div>
        <NotiStateContext>
          {NotiContext?.noti.length ? (
            <div className={styles.notiExistWrapper}>
              <div className={styles.buttonWrap}>
                <DeleteAllButton />
                <ReloadNotiButton />
              </div>
              <div>
                {NotiContext?.noti.map((data: Noti) => (
                  <NotiItem key={data.id} data={data} />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.notiEmptyWrapper}>
              <ReloadNotiButton />
              <div>💭 새로운 알림이 없습니다!</div>
            </div>
          )}
        </NotiStateContext>
      </div>
    </div>
  );
}

function ReloadNotiButton() {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return (
    <button
      className={
        NotiContext?.spinReloadButton
          ? styles.spinReloadButton
          : styles.reloadButton
      }
      onClick={() => NotiContext?.setClickReloadNoti?.(true)}
    >
      &#8635;
    </button>
  );
}

function DeleteAllButton() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const setError = useSetRecoilState(errorState);
  const allNotiDeleteHandler = async () => {
    try {
      await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      HeaderState?.resetOpenNotiBarState();
    } catch (e) {
      setError('JB05');
    }
  };
  return (
    <button className={styles.deleteButton} onClick={allNotiDeleteHandler}>
      &#9745; 전체삭제
    </button>
  );
}
