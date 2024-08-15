import { useRecoilState } from 'recoil';
import { agendaModalState } from 'utils/recoil/agenda/modalState';
import styles from 'styles/agenda/modal.module.scss';

// interface NoticeModalProps {
//   title?: string;
//   description: string;
//   onCancel: () => void;
// }

const NoticeModal = () => {
  const [modalProps, setModalProps] = useRecoilState(agendaModalState);
  if (!modalProps) return null;
  const { title, description, onCancel } = modalProps;

  const closeModal = () => {
    setModalProps(null);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        {title && (
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={styles.contentContainer}>
          <p>{description}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={closeModal}>확인</button>
        </div>
      </div>
    </>
  );
};

export default NoticeModal;
