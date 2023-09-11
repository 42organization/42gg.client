import { useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/match/MatchRejectModal.module.scss';

export default function MatchRejectModal() {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const content = {
    main: '이미 3개의 예약된 경기가 있습니다.',
    sub: '⚠︎ 해당 슬롯에 등록하고 싶다면\n예약되어 있는 경기를 취소해 주세요.',
  };

  const onReturn = () => {
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😤</div>
        <div className={styles.message}>{content.main}</div>
        <div className={styles.subContent}>{content.sub}</div>
      </div>
      <ModalButtonContainer>
        <ModalButton onClick={onReturn} style='positive' value='확 인' />
      </ModalButtonContainer>
    </div>
  );
}
