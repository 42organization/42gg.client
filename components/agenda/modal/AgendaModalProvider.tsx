import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import NoticeModal from 'components/agenda/modal/NoticeModal';
import ProceedCheckModal from 'components/agenda/modal/ProceedCheckModal';
import { useModal } from 'components/agenda/modal/useModal';
import styles from 'styles/agenda/modal/AgendaModalProvider.module.scss';

const AgendaModalProvider = () => {
  const [modalProps] = useRecoilState(agendaModalState);
  const { closeModal } = useModal();

  let modalContent;

  if (modalProps) {
    switch (modalProps.type) {
      case 'proceedCheck':
        modalContent = <ProceedCheckModal {...modalProps} />;
        break;
      case 'notice':
        modalContent = <NoticeModal {...modalProps} />;
        break;
      default:
        modalContent = null;
    }
  }

  return (
    <>
      {modalProps && (
        <div className={styles.backdrop} id='modalOutside' onClick={closeModal}>
          {modalContent}
        </div>
      )}
    </>
  );
};

export default AgendaModalProvider;
