import { useContext } from 'react';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/Layout/NotiBar.module.scss';
import { instance } from 'utils/axios';
import { NewNotiContext, NewNotiContextState } from './NewNotiProvider';
import { Noti } from 'types/notiTypes';
import NotiItem from '../NotiItem';

export const NotiCloseButton = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <button onClick={() => HeaderState?.resetOpenNotiBarState()}>
      &#10005;
    </button>
  );
};

export const NotiExist = () => {
  const NotiContext = useContext<NewNotiContextState | null>(NewNotiContext);

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
        {NotiContext?.noti.map((data: Noti) => (
          <NotiItem key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};

export const NotiEmpty = () => {
  const NotiContext = useContext<NewNotiContextState | null>(NewNotiContext);

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
  const NotiContext = useContext<NewNotiContextState | null>(NewNotiContext);

  if (NotiContext?.noti.length) {
    return <NotiExist />;
  }
  return <NotiEmpty />;
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
