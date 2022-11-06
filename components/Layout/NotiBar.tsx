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
  const [clickReloadBtn, setClickReloadBtn] = useState(false);
  const [reloadBtnAnimation, setReloadBtnAnimation] = useState(false);
  const resetOpenNotiBar = useResetRecoilState(openNotiBarState);
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    getNotiHandler();
  }, []);

  useEffect(() => {
    if (clickReloadBtn) getNotiHandler();
  }, [clickReloadBtn]);

  const getNotiHandler = async () => {
    if (clickReloadBtn) {
      setReloadBtnAnimation(true);
      setTimeout(() => {
        setReloadBtnAnimation(false);
      }, 1000);
    }
    try {
      const res = await instance.get(`/pingpong/notifications`);
      setNoti(res?.data.notifications);
      setClickReloadBtn(false);
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
            <div className={styles.btnWrap}>
              <DeleteAllBtn />
              <ReloadNotiBtn
                reloadBtnAnimation={reloadBtnAnimation}
                setClickReloadBtn={setClickReloadBtn}
              />
            </div>
            <div>
              {noti.map((data: Noti) => (
                <NotiItem key={data.id} data={data} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyContent}>
            <></>
            <ReloadNotiBtn
              reloadBtnAnimation={reloadBtnAnimation}
              setClickReloadBtn={setClickReloadBtn}
            />
            <div>💭 새로운 알림이 없습니다!</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ReloadNotiBtnProps {
  reloadBtnAnimation: boolean;
  setClickReloadBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReloadNotiBtn({
  reloadBtnAnimation,
  setClickReloadBtn,
}: ReloadNotiBtnProps) {
  return (
    <button
      className={
        reloadBtnAnimation ? styles.refreshBtnAnimation : styles.refreshBtn
      }
      onClick={() => setClickReloadBtn(true)}
    >
      &#8635;
    </button>
  );
}

function DeleteAllBtn() {
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
    <button className={styles.deleteBtn} onClick={allNotiDeleteHandler}>
      &#9745; 전체삭제
    </button>
  );
}
