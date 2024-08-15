import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import styles from 'styles/agenda/modal/Modals.module.scss';
import NoticeModal from './NoticeModal';
import ProceedCheckModal from './ProceedCheckModal';

const AgendaModalProvider = () => {
  const [modalProps, setModalProps] = useRecoilState(agendaModalState);

  const closeModalHandler = (e: React.MouseEvent) => {
    setModalProps(null);
  };

  let modalContent;

  if (modalProps) {
    switch (modalProps.type) {
      case 'proceedCheck':
        modalContent = <ProceedCheckModal />;
        break;
      case 'notice':
        modalContent = <NoticeModal />;
        break;
      default:
        modalContent = null;
    }
  }

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

export default AgendaModalProvider;
