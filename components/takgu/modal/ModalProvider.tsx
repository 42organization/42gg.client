import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/takgu/match';
import { modalState, modalTypeState } from 'utils/recoil/takgu/modal';
import AdminModal from 'components/takgu/modal/modalType/AdminModal';
import NormalModal from 'components/takgu/modal/modalType/NormalModal';
import StoreModal from 'components/takgu/modal/modalType/StoreModal';
import styles from 'styles/takgu/modal/Modal.module.scss';
import PartyModal from './modalType/PartyModal';
import TournamentModal from './modalType/TournamentModal';

export default function ModalProvider() {
  const [{ modalName }, setModal] = useRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const modalType = useRecoilValue(modalTypeState);

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalName]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modalName?.split('-')[0] === 'FIXED') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      if (modalName === 'MATCH-CANCEL') {
        setReloadMatch(true);
      } else {
        setModal({ modalName: null });
      }
    }
  };

  return (
    modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        {modalType === 'NORMAL' ? (
          <NormalModal />
        ) : modalType === 'STORE' ? (
          <StoreModal />
        ) : modalType === 'ADMIN' ? (
          <AdminModal />
        ) : modalType === 'TOURNAMENT' ? (
          <TournamentModal />
        ) : modalType === 'PARTY' ? (
          <PartyModal />
        ) : null}
      </div>
    )
  );
}
