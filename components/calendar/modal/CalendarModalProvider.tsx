import { useRecoilState } from 'recoil';
import { calendarModalState } from 'utils/recoil/calendar/modalState';
import styles from 'styles/calendar/modal/CalendarModalProvider.module.scss';
import AddSelect from './AddSelect';
import PrivateScheduleAddModal from './PrivateScheduleAddModal';
import ScheduleDetailModal from './ScheduleDetailModal';
import { useCalendarModal } from './useCalendarModal';

const CalendarModalProvider = () => {
  const [modalProps] = useRecoilState(calendarModalState);
  const { closeModal } = useCalendarModal();

  let modalContent;
  if (modalProps) {
    switch (modalProps.type) {
      case 'detail':
        modalContent = <ScheduleDetailModal {...modalProps} />;
        break;
      case 'AddSelect':
        modalContent = <AddSelect {...modalProps} />;
        break;
      case 'PrivateUpsert':
        modalContent = <PrivateScheduleAddModal {...modalProps} />;
        break;
      default:
        modalContent = null;
    }
  }
  const closeModalHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      closeModal();
    }
  };

  return (
    <>
      {modalProps && (
        <div
          className={styles.backdrop}
          id='modalOutside'
          onClick={closeModalHandler}
        >
          {modalContent}
        </div>
      )}
    </>
  );
};

export default CalendarModalProvider;
