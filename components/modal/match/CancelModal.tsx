import { useSetRecoilState } from 'recoil';
import { Cancel } from 'types/modalTypes';
import instance from 'utils/axios';
import { isBeforeMin } from 'utils/handleTime';
import { errorState } from 'utils/recoil/error';
import { openCurrentMatchState, reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/CancelModal.module.scss';

export default function CancelModal({ isMatched, slotId, time }: Cancel) {
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const cancelLimitTime = 5;
  const rejectCancel = isBeforeMin(time, cancelLimitTime) && isMatched;
  const messageType = rejectCancel ? 'reject' : 'cancel';
  const message = {
    emoji: {
      cancel: '🤔',
      reject: '😰',
    },
    main: {
      cancel: ['해당 경기를', '취소하시겠습니까?'],
      reject: ['매칭이 완료되어', '경기를 취소할 수 없습니다!!'],
    },
    sub: {
      cancel: [
        '⚠︎ 매칭이 완료된 경기를 취소하면',
        '1분 간 새로운 예약이 불가합니다!',
      ],
      reject: [
        `경기시작 ${cancelLimitTime}분 전부터는`,
        '경기를 취소할 수 없습니다..',
      ],
    },
  };
  const cancelResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 취소되었습니다.',
    SD001: '이미 지난 경기입니다.',
    SD002: '이미 매칭이 완료된 경기입니다.',
  };

  const onCancel = async () => {
    try {
      await instance.delete(`/pingpong/match/slots/${slotId}`);
      alert(cancelResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in cancelResponse)
        alert(cancelResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        setOpenCurrentMatch(false);
        setError('JH01');
        return;
      }
    }
    setModal({ modalName: null });
    setOpenCurrentMatch(false);
    setReloadMatch(true);
  };

  const onReturn = () => {
    setModal({ modalName: null });
    if (rejectCancel) setReloadMatch(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>{message.emoji[messageType]}</div>
        <>
          {message.main[messageType].map((e, i) => (
            <div key={i}>{e}</div>
          ))}
          {(rejectCancel || (!rejectCancel && isMatched)) && (
            <div className={styles.subContent}>
              {message.sub[messageType].map((e, i) => (
                <div key={i}>{e}</div>
              ))}
            </div>
          )}
        </>
      </div>
      <div className={styles.buttons}>
        {rejectCancel ? (
          <div className={styles.positive}>
            <input onClick={onReturn} type='button' value='확인' />
          </div>
        ) : (
          <>
            <div className={styles.negative}>
              <input onClick={onReturn} type='button' value='아니오' />
            </div>
            <div className={styles.positive}>
              <input onClick={onCancel} type='button' value='예' />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
