import { calendarModalProps } from 'types/calendar/modalTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';

const CheckModal = (props: calendarModalProps) => {
  const { type, title, description, onProceed, onCancel } = props;

  const { handleProceed, handleCancel } = useCalendarModal();

  return <div className='modalContainer'></div>;
};
