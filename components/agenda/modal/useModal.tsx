import { useSetRecoilState } from 'recoil';
import { agendaModal } from 'types/agenda/modalTypes';
import { agendaModalState } from 'utils/recoil/agenda/modalState';

export const useModal = () => {
  const setModalState = useSetRecoilState(agendaModalState);

  const openModal = (props: agendaModal) => {
    setModalState(props);
  };

  const closeModal = (e: React.MouseEvent) => {
    setModalState(null);
  };

  return { openModal, closeModal };
};
