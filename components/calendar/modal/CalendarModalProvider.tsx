import { useRecoilState } from 'recoil';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import { calendarModalState } from 'utils/recoil/calendar/modalState';
import AddSelect from 'components/calendar/modal/AddSelect';
import PrivateScheduleUpsertModal from 'components/calendar/modal/PrivateScheduleUpsertModal';
import ScheduleDetailModal from 'components/calendar/modal/ScheduleDetailModal';
import styles from 'styles/calendar/modal/CalendarModalProvider.module.scss';

const CalendarModalProvider = () => {
  const [modalProps, setModalState] = useRecoilState(calendarModalState);
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
        modalContent = <PrivateScheduleUpsertModal {...modalProps} />;
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
