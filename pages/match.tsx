import MatchBoardList from 'components/match/MatchBoardList';
import MatchManual from 'components/match/MatchManual';
import MatchEnrollModal from 'components/modal/MatchEnrollModal';
import MatchRejectModal from 'components/modal/MatchRejectModal';
import Modal from 'components/modal/Modal';
import { useRecoilValue } from 'recoil';
import styles from 'styles/match/match.module.scss';
import { manualModalState, rejectModalState } from 'utils/recoil/match';

export default function Match() {
  const openRejectModal = useRecoilValue(rejectModalState);
  const openManualModal = useRecoilValue(manualModalState);

  return (
    <>
      {openManualModal && (
        <Modal>
          <MatchManual />
        </Modal>
      )}
      {openRejectModal && (
        <Modal>
          <MatchRejectModal />
        </Modal>
      )}
      <div className={styles.container}>
        <h1 className={styles.title}>Match</h1>
        <MatchBoardList type='single' />
        <MatchEnrollModal />
      </div>
    </>
  );
}
