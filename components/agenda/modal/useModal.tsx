import { useSetRecoilState } from 'recoil';
import { agendaModal } from 'types/agenda/modalTypes';
import { agendaModalState } from 'utils/recoil/agenda/modalState';

export const useModal = () => {
  const setModalState = useSetRecoilState(agendaModalState);

  const openModal = (props: agendaModal) => {
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

  return { openModal, closeModal, handleCancel, handleProceed };
};
