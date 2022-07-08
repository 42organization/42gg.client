import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import MatchBoardList from 'components/match/MatchBoardList';
import MatchManualModal from 'components/modal/MatchManualModal';
import MatchEnrollModal from 'components/modal/MatchEnrollModal';
import MatchRejectModal from 'components/modal/MatchRejectModal';
import Modal from 'components/modal/Modal';
import { matchModalState } from 'utils/recoil/match';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const [matchModal, setMatchModal] = useRecoilState(matchModalState);

  useEffect(() => {
    return setMatchModal(null);
  }, []);

  const ModalChild = () => {
    if (matchModal === 'enroll') return <MatchEnrollModal />;
    else if (matchModal === 'manual')
      return <MatchManualModal isPage={false} />;
    else if (matchModal === 'reject') return <MatchRejectModal />;
    else return null;
  };

  const ModalProvider = () =>
    matchModal ? (
      <Modal>
        <ModalChild />
      </Modal>
    ) : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Match</h1>
      <MatchBoardList type='single' />
      <ModalProvider />
    </div>
  );
}
