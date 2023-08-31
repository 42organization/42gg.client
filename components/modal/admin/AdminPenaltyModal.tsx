import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IPenaltyInfo } from 'types/admin/adminPenaltyTypes';
import { instanceInManage } from 'utils/axios';
import { fillZero } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminPenalty.module.scss';

export default function AdminPenaltyModal(props: { intraId: string }) {
  const [penaltyInfo, setPenaltyInfo] = useState<IPenaltyInfo>({
    intraId: props.intraId,
    reason: '',
    penaltyTime: 0,
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const inputHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'penaltyTime' && value.length > 2)
      return setSnackBar({
        toastName: 'penalty',
        severity: 'error',
        message: '적용시간은 2자리 이하로 입력해주세요.',
        clicked: true,
      });
    setPenaltyInfo({ ...penaltyInfo, [name]: value });
  };

  const timeHandler = (e: number) => {
    const now = new Date();
    const newDate = new Date(now.getTime() + e * 3600000);
    const resultMonth = fillZero((newDate.getMonth() + 1).toString(), 2);
    const resultDate = fillZero(newDate.getDate().toString(), 2);
    const resultHour = fillZero(newDate.getHours().toString(), 2);
    const resultMinute = fillZero(newDate.getMinutes().toString(), 2);
    return `${newDate.getFullYear()}-${resultMonth}-${resultDate} ${resultHour}:${resultMinute}`;
  };

  const sendPenaltyHandler = async () => {
    const { intraId, penaltyTime, reason } = penaltyInfo;
    if (intraId !== props.intraId) {
      setSnackBar({
        toastName: 'penalty',
        severity: 'error',
        message: `intra ID가 일치하지 않습니다.`,
        clicked: true,
      });
      return;
    }
    if (!reason || !penaltyTime) {
      setSnackBar({
        toastName: 'penalty',
        severity: 'error',
        message: `모든 항목을 입력해주세요.`,
        clicked: true,
      });
      return;
    } else if (isNaN(Number(penaltyTime))) {
      setSnackBar({
        toastName: 'penalty',
        severity: 'error',
        message: `적용시간은 숫자만 입력해주세요.`,
        clicked: true,
      });
      return;
    }
    try {
      const res = await instanceInManage.post(`/penalty`, {
        intraId,
        reason,
        penaltyTime,
      });
      if (res.status === 403) {
        setSnackBar({
          toastName: 'penalty',
          severity: 'error',
          message: '권한이 없습니다',
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'penalty',
          severity: 'success',
          message: '부여 성공',
          clicked: true,
        });
      }
      setModal({ modalName: null });
    } catch (e) {
      setSnackBar({
        toastName: 'penalty',
        severity: 'error',
        message: `잘못된 요청입니다`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>패널티 부여 설정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>intra ID:</div>
            <input
              className={styles.intraBlank}
              name='intraID'
              value={props.intraId}
              readOnly
            />
          </div>
          <div className={styles.reasonWrap}>
            <div className={styles.bodyText}>사유:</div>
            <textarea
              className={styles.reasonBlank}
              name='reason'
              placeholder={'사유를 입력하세요'}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.dateWrap}>
            <div className={styles.bodyText}>적용시간:</div>
            <input
              className={styles.dateBlank}
              name='penaltyTime'
              placeholder={'적용 시간을 입력하세요'}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.dateWrap}>
            <div className={styles.bodyText}>해방시간:</div>
            <input
              className={styles.dateBlank}
              name='freeTime'
              value={timeHandler(penaltyInfo.penaltyTime)}
              readOnly
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              sendPenaltyHandler();
            }}
            className={styles.btn1}
          >
            적용
          </button>
          <button
            className={styles.btn2}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
