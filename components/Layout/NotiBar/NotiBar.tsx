import { useContext } from 'react';
import styles from 'styles/Layout/NotiBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import NotiStateContext from './NotiContext';
import { NotiContextState, NotiProvider } from './NotiContext';
import NotiItem from './NotiItem';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { instance } from 'utils/axios';
import { Noti } from 'types/notiTypes';
import NotiEmptyEmoji from 'public/image/noti_empty.svg';

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
      <div className={styles.notiEmptyImoji}>
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

  const clickReloadNoti = () => {
    HeaderState?.putNotiHandler();
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
