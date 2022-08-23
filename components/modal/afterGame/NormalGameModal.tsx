import { useSetRecoilState } from 'recoil';
import { CurrentGameInfo } from 'types/scoreTypes';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/AfterGameModal.module.scss';
import { MatchTeamsInfo } from './MatchTeamsInfo';
import Guide from './Guide';
import { isAfterMin } from 'utils/handleTime';

interface NormalGameModalProps {
  currentGameInfo: CurrentGameInfo;
  guide: { trueStr: string; falseStr: string };
}

export default function NormalGameModal({
  currentGameInfo,
  guide,
}: NormalGameModalProps) {
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const { startTime, matchTeamsInfo } = currentGameInfo;
  const canBeCompleted = isAfterMin(startTime, 10);

  const submitResultHandler = async () => {
    try {
      await instance.post(`/pingpong/games/result/normal`);
      alert('게임이 종료되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e) {
      setErrorMessage('JH04');
      return;
    }
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <Guide condition={canBeCompleted} {...guide} />
      <div className={styles.rules}>
        <div>💡 경기시작 10분 후부터 </div>
        <div>💡 경기를 완료할 수 있습니다</div>
      </div>
      <div className={styles.resultContainer}>
        <MatchTeamsInfo matchTeamsInfo={matchTeamsInfo} />
      </div>
      <div className={styles.buttons}>
        {canBeCompleted && (
          <div className={styles.positive}>
            <input onClick={submitResultHandler} type='button' value='확 인' />
          </div>
        )}
      </div>
    </div>
  );
}
