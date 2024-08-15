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

  return <button onClick={openConfirmModal}>확인</button>;
};

export default ConfirmModal;
