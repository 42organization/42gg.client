import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ISeason, ISeasonEditInfo } from 'types/takgu/seasonTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/takgu/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/takgu/admin/modal/SeasonEdit.module.scss';

const AdminSeasonEdit = ({
  seasonId,
  seasonName,
  pppGap,
  status,
  startPpp,
  startTime,
}: ISeason) => {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const [seasonInfo, setSeasonInfo] = useState<ISeasonEditInfo>({
    seasonName,
    startTime,
    startPpp,
    pppGap,
  });

  const editHandler = async () => {
    try {
      await instanceInManage.put(`/seasons/${seasonId}`, seasonInfo);
      setSnackBar({
        toastName: 'Season Edit',
        severity: 'success',
        message: `성공적으로 수정되었습니다! `,
        clicked: true,
      });
      setModal({ modalName: null });
    } catch (e: any) {
      setSnackBar({
        toastName: 'Edit Error',
        severity: 'error',
        message: `Put 실패 ${e.response?.data.code}`,
        clicked: true,
      });
    }
  };

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    name === 'startPpp' || name === 'pppGap'
      ? setSeasonInfo({ ...seasonInfo, [name]: parseInt(value) })
      : setSeasonInfo({ ...seasonInfo, [name]: value });
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
            <div className={styles.bodyText}>seasonId</div>
            <input value={seasonId} disabled={true} />
          </div>
          <div>
            <div className={styles.bodyText}>seasonName</div>
            <input
              value={seasonInfo.seasonName}
              name='seasonName'
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <div className={styles.bodyText}>startTime</div>
            {status === 'CURRENT' ? (
              <input
                value={seasonInfo.startPpp.toString()}
                type='datetime-local'
                disabled={true}
              />
            ) : (
              <input
                value={seasonInfo.startTime.toString()}
                type='datetime-local'
                name='startTime'
                disabled={status === 'CURRENT'}
                onChange={inputChangeHandler}
              />
            )}
          </div>
          <div>
            <div className={styles.bodyText}>startPpp</div>
            {status === 'CURRENT' ? (
              <input value={seasonInfo.startPpp.toString()} disabled={true} />
            ) : (
              <input
                type='number'
                name='startPpp'
                value={seasonInfo.startPpp.toString()}
                onChange={inputChangeHandler}
              />
            )}
          </div>
          <div>
            <div className={styles.bodyText}>pppGap</div>
            <input
              type='number'
              name='pppGap'
              value={seasonInfo.pppGap.toString()}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={editHandler}>수정</button>
          <button onClick={() => setModal({ modalName: null })}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSeasonEdit;
