import { useEffect, useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { Noti } from 'types/notiTypes';
import { openNotiBarState } from 'utils/recoil/layout';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import NotiItem from './NotiItem';
import styles from 'styles/Layout/NotiBar.module.scss';

export default function NotiBar() {
  const [noti, setNoti] = useState<Noti[]>([]);
  const [clickReloadNoti, setClickReloadNoti] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);
  const resetOpenNotiBar = useResetRecoilState(openNotiBarState);
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    getNotiHandler();
  }, []);

  useEffect(() => {
    if (clickReloadNoti) getNotiHandler();
  }, [clickReloadNoti]);

  const getNotiHandler = async () => {
    if (clickReloadNoti) {
      setSpinReloadButton(true);
      setTimeout(() => {
        setSpinReloadButton(false);
      }, 1000);
    }
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNoti(res?.data.notifications);
      setClickReloadNoti(false);
    } catch (e) {
      setError('JB04');
    }
  };

  return (
    <div className={styles.backdrop} onClick={resetOpenNotiBar}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button onClick={resetOpenNotiBar}>&#10005;</button>
        {noti.length ? (
          <>
            <div className={styles.buttonWrap}>
              <DeleteAllButton />
              <ReloadNotiButton
                spinReloadButton={spinReloadButton}
                setClickReloadNoti={setClickReloadNoti}
              />
            </div>
            <div>
              {noti.map((data: Noti, index) => (
                <NotiItem key={index} data={data} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyContent}>
            <></>
            <ReloadNotiButton
              spinReloadButton={spinReloadButton}
              setClickReloadNoti={setClickReloadNoti}
            />
            <div>💭 새로운 알림이 없습니다!</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ReloadNotiButtonProps {
  spinReloadButton: boolean;
  setClickReloadNoti: React.Dispatch<React.SetStateAction<boolean>>;
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
      onClick={() => setClickReloadNoti(true)}
    >
      &#8635;
    </button>
  );
}

function DeleteAllButton() {
  const resetOpenNotiBar = useResetRecoilState(openNotiBarState);
  const setError = useSetRecoilState(errorState);
  const allNotiDeleteHandler = async () => {
    try {
      await instance.delete(`/pingpong/notifications`);
      alert('알림이 성공적으로 삭제되었습니다.');
      resetOpenNotiBar();
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
