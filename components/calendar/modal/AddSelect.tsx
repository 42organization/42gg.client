import React, { useState } from 'react';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import CheckSVG from 'public/image/calendar/checkIcon.svg';
import styles from 'styles/calendar/modal/AddSelect.module.scss';

const AddSelect = (props: calendarModalProps) => {
  const [modalType, setModalType] = useState('');
  const { openModal } = useCalendarModal();

  const handleClick = (content: string) => {
    setModalType(content);
    if (modalType === '개인 일정') {
      openModal({ type: 'PrivateUpsert', schedule: props.schedule });
    }
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={
          modalType === '공유 일정'
            ? styles.activeContent
            : styles.inActiveContent
        }
        onClick={() => handleClick('공유 일정')}
      >
        공유 일정
        {modalType === '공유 일정' && (
          <CheckSVG width={12} height={9} fill='#FFFFFF' />
        )}
      </div>
      <div
        className={
          modalType === '개인 일정'
            ? styles.activeContent
            : styles.inActiveContent
        }
        onClick={() => handleClick('개인 일정')}
      >
        개인 일정
        {modalType === '개인 일정' && (
          <CheckSVG width={12} height={9} fill='#FFFFFF' />
        )}
      </div>
    </div>
  );
};

export default AddSelect;
