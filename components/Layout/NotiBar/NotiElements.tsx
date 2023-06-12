import { useContext } from 'react';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/Layout/NotiBar.module.scss';
import { instance } from 'utils/axios';
import { NotiProvider, NotiContextState } from './NotiContext';
import { Noti } from 'types/notiTypes';
import NotiItem from './NotiItem';

export const NotiCloseButton = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <button onClick={() => HeaderState?.resetOpenNotiBarState()}>
      &#10005;
    </button>
  );
};

interface NullNotiProps {
  createdAt: string;
  isChecked: boolean;
}

const NullNoti = ({ createdAt, isChecked }: NullNotiProps) => {
  const date = createdAt.slice(5).replace('T', ' ');

  return (
    <div className={isChecked ? `${styles.readWrap}` : `${styles.unreadWrap}`}>
      <span className={styles.title}>실패</span>
      <div className={styles.content}>알림을 불러올 수 없습니다!</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export const NotiExist = () => {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return (
    <>
      <div className={styles.buttonWrap}>
        <DeleteAllButton />
        <ReloadNotiButton
          spinReloadButton={NotiContext?.spinReloadButton ?? false}
          setClickReloadNoti={NotiContext?.setClickReloadNoti}
        />
      </div>
      <div>
        {NotiContext?.noti.map((data: Noti) =>
          data.message ? (
            <NotiItem key={data.id} data={data} />
          ) : (
            <NullNoti
              key={data.id}
              createdAt={data.createdAt}
              isChecked={data.isChecked}
            />
          )
        )}
      </div>
    </>
  );
};

export const NotiEmpty = () => {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return (
    <div className={styles.emptyContent}>
      <></>
      <ReloadNotiButton
        spinReloadButton={NotiContext?.spinReloadButton}
        setClickReloadNoti={NotiContext?.setClickReloadNoti}
      />
      <div>💭 새로운 알림이 없습니다!</div>
    </div>
  );
};

export const NotiMain = () => {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  if (NotiContext?.noti.length) {
    return <NotiExist />;
  }
  // return <NotiEmpty />;
  return <NotiExist />;
};

interface ReloadNotiButtonProps {
  spinReloadButton: boolean | undefined;
  setClickReloadNoti: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

function ReloadNotiButton({
  spinReloadButton,
  setClickReloadNoti,
}: ReloadNotiButtonProps) {
  return (
    <button
      className={
        spinReloadButton ? styles.spinReloadButton : styles.reloadButton
      }
      onClick={() => setClickReloadNoti?.(true)}
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
