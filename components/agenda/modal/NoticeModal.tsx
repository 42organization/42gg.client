import { agendaModal } from 'types/agenda/modalTypes';
import styles from 'styles/agenda/modal/modal.module.scss';
import { useModal } from './useModal';

const NoticeModal = (props: agendaModal) => {
  const { title, description, onProceed } = props;

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
          <button onClick={onProceed}>확인</button>
        </div>
      </div>
    </>
  );
};

export default NoticeModal;
