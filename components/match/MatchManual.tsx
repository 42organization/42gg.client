import { useSetRecoilState } from 'recoil';
import styles from 'styles/match/MatchManual.module.scss';
import { manualModalState } from 'utils/recoil/match';

export default function MatchManual() {
  const openManualModal = useSetRecoilState(manualModalState);

  const onReturn = () => {
    openManualModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Please!!</div>
      <div className={styles.text}>
        🔍 매칭 <br />
        <div className={styles.textPadding}>
          - 경기 시작 5분 전 상대팀 공개 및 취소 불가 <br />
          - 경기 시간은 10분 <br />
          - 매칭 후 슬롯 취소 시, 1분 패널티 <br />
        </div>
        <br />
        📖 룰 <br />
        <div className={styles.textPadding}>
          - 3판 2선승 <br />
          - 탁구대를 손으로 짚으면 실점 <br />
          - 천장 맞으면 실점 <br />
        </div>
        <br />
        🏓 서브 <br />
        <div className={styles.textPadding}>
          - 첫 세트만 서브게임을 진행한다. <br />
          - 서브 게임이후 승자부터 세트별로 서브를 진행한다. <br />
          - 서브 시작 시 상대방에게 신호주기 ( 서브하겠습니다. ) <br />
        </div>
        <br />
        ✅ 게임 결과 입력 <br />
        <div className={styles.textPadding}>
          - 게임 시간이 지났을 경우 <br />
          - 다음 팀이 있을 시 현재 스코어가 높은 유저가 승리한다. <br />
          - 다음 팀이 없을시 계속 진행이 가능하다. <br />
        </div>
        <br />
      </div>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value='확 인' />
        </div>
      </div>
    </div>
  );
}
