import { useContext, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Noti } from 'types/notiTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/Layout/HeaderContext';
import NotiStateContext, {
  NotiContextState,
  NotiProvider,
} from 'components/Layout/NotiBar/NotiContext';
import NotiItem from 'components/Layout/NotiBar/NotiItem';
import NotiEmptyEmoji from 'public/image/noti_empty.svg';
import styles from 'styles/Layout/NotiBar.module.scss';

export default function NotiBar() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

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
          <div className={styles.buttonWrap}>
            <DeleteAllButton />
            <ReloadNotiButton />
          </div>
          <NotiMain />
        </NotiStateContext>
        <div className={styles.notiDecorate}>
          <div className={styles.circleOne}></div>
          <div className={styles.circleTwo}></div>
        </div>
      </div>
    </div>
  );
}

function NotiMain() {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return NotiContext?.noti.length ? <NotiExist /> : <NotiEmpty />;
}

function NotiExist() {
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);

  return (
    <div className={styles.notiExistWrapper}>
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
  );
}

function NotiEmpty() {
  return (
    <div className={styles.notiEmptyWrapper}>
      <div className={styles.notiEmptyText}>새로운 알림이 없습니다!</div>
      <div>
        <div className={styles.threeDotImage}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <NotiEmptyEmoji />
      </div>
    </div>
  );
}

function ReloadNotiButton() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const NotiContext = useContext<NotiContextState | null>(NotiProvider);
  const reloadButtonStyle = NotiContext?.spinReloadButton
    ? styles.spinReloadButton
    : styles.reloadButton;

  const clickReloadNoti = async () => {
    await HeaderState?.putNotiHandler();
    NotiContext?.setClickReloadNoti?.(true);
  };

  return (
    <button
      className={`${reloadButtonStyle}`}
      onClick={() => clickReloadNoti()}
    >
      &#8635;
    </button>
  );
}

function DeleteAllButton() {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const setError = useSetRecoilState(errorState);
  const [isLoading, setIsLoading] = useState(false);

  const allNotiDeleteHandler = async () => {
    setIsLoading(true);
    try {
      await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      HeaderState?.resetOpenNotiBarState();
    } catch (e) {
      setError('JB05');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className={styles.deleteButton}
      onClick={allNotiDeleteHandler}
      disabled={isLoading}
    >
      전체 삭제
    </button>
  );
}

interface NullNotiProps {
  createdAt: string;
  isChecked: boolean;
}

function NullNoti({ createdAt, isChecked }: NullNotiProps) {
  const date = createdAt.slice(5).replace('T', ' ');

  return (
    <div className={isChecked ? `${styles.readWrap}` : `${styles.unreadWrap}`}>
      <span className={styles.title}>실패</span>
      <div className={styles.content}>알림을 불러올 수 없습니다!</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
}
