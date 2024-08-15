import React from 'react';
import { useSetRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';

const AlarmModal = ({ title, message, onProceed, cancel }) => {
  const setModalProps = useSetRecoilState(agendaModalState);

  const openAlarmModal = () => {
    setModalProps({
      title,
      message,
      onProceed,
      cancel,
    });
  };

  return <button onClick={openAlarmModal}>알람</button>;
};

export default AlarmModal;
