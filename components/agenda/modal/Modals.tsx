// components/Modal.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import styles from 'styles/agenda/modal/Modals.module.scss';

const Modal = () => {
  const [modalProps, setModalProps] = useRecoilState(agendaModalState);

  if (!modalProps) return null;

  const { title, message, onProceed, children } = modalProps;

  const closeModal = () => {
    setModalProps(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{message}</p>
        {children}
        <div className={styles.modalActions}>
          <button onClick={closeModal}>Cancel</button>
          <button
            onClick={() => {
              onProceed();
              closeModal();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
