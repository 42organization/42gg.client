import { useSetRecoilState, useRecoilValue } from 'recoil';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { calendarModalState } from 'utils/recoil/calendar/modalState';

export const useCalendarModal = () => {
  const setModalState = useSetRecoilState(calendarModalState);
  const modalState = useRecoilValue(calendarModalState);

  const openModal = (props: calendarModalProps) => {
    setModalState(props);
  };

  const closeModal = () => {
    setModalState(null);
  };

  const handleCancel = (onCancel?: () => void) => {
    if (onCancel) onCancel();
    closeModal();
  };

  const handleProceed = (onProceed?: () => void) => {
    if (onProceed) onProceed();
    closeModal();
  };

  const isOpen = modalState !== null;

  return { openModal, closeModal, handleCancel, handleProceed, isOpen };
};
