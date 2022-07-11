import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

import styles from 'styles/modal/MatchManualModal.module.scss';

type ManualProps = {
  isPage: boolean;
};
export default function MatchManualModal({ isPage }: ManualProps) {
  const setModalInfo = useSetRecoilState(modalState);
  const router = useRouter();

  const onReturn = () => {
    if (isPage) {
      router.push(`/`);
    } else {
      setModalInfo({ modalName: null });
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Please!!</div>
      <ul className={styles.ruleList}>
        <li>
          🔍 매칭
          <ul className={styles.ruleDetail}>
            <li>등록한 경기가 끝나야만 다음 경기 등록 가능</li>
            <li>경기 시작 5분 전 상대 팀 공개 및 경기 취소 불가</li>
            <li>매칭 취소 시, 1분간 경기 등록 불가</li>
            <li>매칭 알림은 이메일로 전달</li>
            <li>일정 점수 이상 차이 나는 상대와 매칭 불가</li>
          </ul>
        </li>
        <li>
          📖 경기
          <ul className={styles.ruleDetail}>
            <li>11점 3판 2선승제</li>
            <li>경기는 10분 동안 진행</li>
            <li>점수가 10:10 인 경우 듀스</li>
            <li>듀스인 경우, 2점 차가 나면 경기 종료</li>
            <li>탁구채를 잡지 않은 손으로 탁구대를 짚으면 실점</li>
            <li>탁구대 및 네트가 아닌 곳에 공이 맞을 시 실점</li>
          </ul>
        </li>
        <li>
          🏓 서브
          <ul className={styles.ruleDetail}>
            <li>첫 세트만 서브 게임 진행</li>
            <li>서브 게임 승자부터 세트별 교대로 서브</li>
            <li>서브는 2점마다 교대하며, 듀스일 때는 1점마다 교대</li>
            <li>서브 시작 시 상대방에게 신호 (e.g. 서브하겠습니다.)</li>
            <li>서브 시 공이 네트에 맞고 넘어가면 다시 서브</li>
          </ul>
        </li>
        <li>
          ✅ 경기 결과
          <ul className={styles.ruleDetail}>
            <li>경기 종료 후 그 자리에서 세트 점수 입력</li>
            <li>다음 경기가 있을 시 현재 스코어가 높은 선수가 승리</li>
            <li>다음 경기가 없을 시 계속 진행</li>
          </ul>
        </li>
      </ul>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input
            onClick={onReturn}
            type='button'
            value={isPage ? '🏠 홈으로 🏠' : '확 인'}
          />
        </div>
      </div>
    </div>
  );
}
