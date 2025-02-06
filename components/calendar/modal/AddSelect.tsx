import React from 'react';
import { DateCellWrapperProps } from 'react-big-calendar';
import CheckSVG from 'public/image/calendar/checkIcon.svg';
import styles from 'styles/calendar/modal/AddSelect.module.scss';
import PrivateScheduleAddModal from './PrivateScheduleAddModal';

interface ModalProps {
  isModalOpen: boolean;
  startDate: string;
  endDate?: string;
  props?: DateCellWrapperProps;
  onClose: () => void;
}

const AddSelect = () => {
  return (
    <div
      className={styles.dropdown}
      // onClick={onClose}
    >
      <div className={styles.ActiveContent}>
        공유 일정
        <CheckSVG width={12} height={9} fill='#FFFFFF' />
      </div>
      <div className={styles.inActiveContent}>개인 일정</div>
    </div>
  );
};

export default AddSelect;
