import React from 'react';
import { useSetRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';

const TestModal = () => {
  const setModalProps = useSetRecoilState(agendaModalState);

  const test = () => {
    setModalProps({
      type: 'proceedCheck',
      title: 'title',
      description: 'message',
      onProceed: () => {
        console.log('onProceed');
        setModalProps(null);
      },
      proceedText: 'proceedText',
      cancelText: 'cancelText',
    });
  };

  return <button onClick={test}>테스트</button>;
};

const TestModal2 = () => {
  const setModalProps = useSetRecoilState(agendaModalState);

  const openAlarmModal = () => {
    setModalProps({
      type: 'notice',
      title: 'title',
      description: 'message',
    });
  };

  return <button onClick={openAlarmModal}>테스트</button>;
};

export { TestModal, TestModal2 };
