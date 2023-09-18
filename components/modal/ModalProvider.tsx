import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState, modalTypeState } from 'utils/recoil/modal';
import AdminModal from 'components/modal/modalType/AdminModal';
import NormalModal from 'components/modal/modalType/NormalModal';
import StoreModal from 'components/modal/modalType/StoreModal';
import styles from 'styles/modal/Modal.module.scss';

export default function ModalProvider() {
  const [{ modalName, isAttended }, setModal] = useRecoilState(modalState);
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
      if (modalName === 'MATCH-CANCEL') setReloadMatch(true);
      else if (modalName === 'EVENT-ANNOUNCEMENT' && isAttended === false) {
        setModal({ modalName: 'EVENT-WELCOME' });
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
        ) : null}
      </div>
    )
  );
}
