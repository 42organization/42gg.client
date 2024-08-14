import React from 'react';
import { useSetRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';

const ConfirmModal = ({ title, message, onProceed }) => {
  const setModalProps = useSetRecoilState(agendaModalState);

  const openConfirmModal = () => {
    setModalProps({
      title,
      message,
      onProceed,
    });
  };

  return <button onClick={openConfirmModal}>Delete Item</button>;
};

export default ConfirmModal;
