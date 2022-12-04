import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/MatchManualModal.module.scss';

export default function MatchManualModal() {
  const setModal = useSetRecoilState(modalState);

  const onReturn = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Please!!</div>
      <ul className={styles.ruleList}>
        {modalContentsRank.map(
          (item: { title: string; description: string[] }, index) => (
            <li key={index}>
              {item.title}
              <ul className={styles.ruleDetail}>
                {item.description.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value={'확 인'} />
        </div>
      </div>
    </div>
  );
}

const modalContentsRank: { title: string; description: string[] }[] = [
  {
    title: '🔍 매칭',
    description: [
      '등록한 경기가 끝나야만 다음 경기 등록 가능',
      '매칭이 완료되면 상대방이 공개되며 부스로 방문하여 경기 진행',
      '상대방이 경기를 취소하면 매칭 대기 상태로 전환',
    ],
  },
  {
    title: '📖 42gg와 함께하기',
    description: [
      '슬롯이 비어있는 상태에서만 등록 가능',
      '빈 슬롯을 누르고 대결할 맴버를 선택',
      '부스로 방문하여 경기 진행',
    ],
  },
  {
    title: '✅ 경기 룰',
    description: [
      '경기는 단판, 5점 내기',
      '경기가 종료된 후 이긴 사람이 점수 입력',
      '입력 전 상호 간 확인이 이루어지므로 잘못 기입 시 상호 책임',
    ],
  },
  {
    title: '🚨 노쇼',
    description: [`상대방이 나타나지 않을 경우 staff에게 말씀해주세요!`],
  },
];
