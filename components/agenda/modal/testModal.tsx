import React from 'react';
import { useModal } from 'components/agenda/modal/useModal';

const TestModal = () => {
  const { openModal } = useModal();
  const test = () => {
    openModal({
      type: 'proceedCheck',
      title: 'title',
      description: 'message',
      onProceed: () => {
        console.log('onProceed'); //test
      },
      proceedText: '확인',
      cancelText: '취소',
    });
  };

  return <button onClick={test}>테스트</button>;
};

const TestModal2 = () => {
  const { openModal } = useModal();

  const openAlarmModal = () => {
    openModal({
      type: 'notice',
      title: 'title',
      description: 'message',
      onProceed: () => {
        console.log('onProceed'); //test
      },
    });
  };

  return <button onClick={openAlarmModal}>테스트</button>;
};

export { TestModal, TestModal2 };
