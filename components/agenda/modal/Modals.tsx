import React from 'react';
import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import styles from 'styles/agenda/modal/Modals.module.scss';

const Modal = () => {
  const [modalProps, setModalProps] = useRecoilState(agendaModalState);

  if (!modalProps) return null;

  const { title, message, onProceed, cancel = true, children } = modalProps;

  const closeModal = () => {
    setModalProps(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}
        {children}
        <div className={styles.modalActions}>
          {cancel && <button onClick={closeModal}>취소</button>}
          <button
            onClick={() => {
              onProceed();
              closeModal();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
