import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/SeasonEdit.module.scss';
import { ISeason } from '../../../types/modalTypes';

export const AdminSeasonEdit = ({
  id,
  seasonName,
  seasonMode,
  pppGap,
  status,
  startPpp,
  startTime,
}: ISeason) => {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const handleClick = () => {
    setSnackBar({
      toastName: 'Season Edit',
      severity: 'success',
      message: `성공적으로 수정되었습니다! `,
      clicked: true,
    });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>시즌 수정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.bodyText}>SeasonId</div>
            <input value={id} disabled={true} />
          </div>
          <div>
            <div className={styles.bodyText}>SeasonName</div>
            <input value={seasonName} />
          </div>
          <div>
            <div className={styles.bodyText}>SeasonMode</div>
            <input value={seasonMode} disabled={status == 1} />
          </div>
          <div>
            <div className={styles.bodyText}>StartTime</div>
            <input
              value={startTime.toString()}
              type='datetime-local'
              disabled={status == 1}
            />
          </div>
          <div>
            <div className={styles.bodyText}>StartPpp</div>
            <input value={startPpp} disabled={status == 1} />
          </div>
          <div>
            <div className={styles.bodyText}>pppGap</div>
            <input value={pppGap} />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              handleClick();
              setModal({ modalName: null });
            }}
          >
            수정
          </button>
          <button onClick={() => setModal({ modalName: null })}>취소</button>
        </div>
      </div>
    </div>
  );
};
