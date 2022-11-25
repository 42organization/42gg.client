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
      '경기가 매칭되면 상대방 공개',
      '경기가 매칭되면 부스로 방문',
      '경기가 매칭된 상태에서 취소 시,\n1분간 경기 등록 불가',
      '상대방이 경기를 취소하면 매칭 대기 상태로 전환',
    ],
  },
  {
    title: '📖 42gg와 함께하기',
    description: [
      '슬롯이 0/2인 상태에서만 등록 가능',
      '빈 슬롯을 고르고 어떤 사람과 경기할지 선택',
      '부스로 방문하여 경기 진행',
    ],
  },
  {
    title: '✅ 경기 룰',
    description: [
      '단판으로 진행되며 선 5점 내기',
      '경기 종료 후 한 사람이 점수 입력',
      '상호 간 확인하며 진행되므로 \n잘못 기입 시 상호 책임',
    ],
  },
  {
    title: '🚨 노쇼',
    description: [`상대방이 나타나지 않을 경우 \nstaff에게 말씀해주세요!`],
  },
];
