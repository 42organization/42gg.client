// import { MatchMode } from 'types/mainType';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

// type ModalMode = MatchMode | 'confirm';
interface GuideProps {
  condition: boolean;
  modalMode: 'NORMAL' | 'RANK';
}

export default function Guide({ condition, modalMode }: GuideProps) {
  const content = {
    NORMAL: {
      before: '즐거운 경기 하셨나요?',
      after: '즐거운 경기 하셨나요?',
      explains: '다음에도 사용해 주실거죠? 😉',
    },
    RANK: {
      before: '경기 후 점수를 입력해주세요',
      after: '경기 결과 확인',
      explains: '💡 3판 2선승제!\n💡 동점은 1점 내기로 승부를 결정!',
    },
    // CONFIRM: {
    //   before: '경기 결과!',
    //   after: '경기 결과!',
    //   explains: '이미 입력된 경기입니다. 점수를 확인하세요!\n',
    // },
  };

  return (
    <>
      <div className={styles.phrase}>
        <div className={styles.emoji}>✅</div>
        <div>
          {condition ? content[modalMode].after : content[modalMode].before}
        </div>
      </div>
      <div className={styles.rules}>{content[modalMode].explains}</div>
    </>
  );
}
