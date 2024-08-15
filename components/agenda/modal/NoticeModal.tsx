import styles from 'styles/agenda/modal.module.scss';

interface NoticeModalProps {
  title?: string;
  description: string;
  onCancel: () => void;
}

const NoticeModal = (props: NoticeModalProps) => {
  return (
    <>
      <div className={styles.modalContainer}>
        {props.title && (
          <div className={styles.titleContainer}>
            <h1>{props.title}</h1>
          </div>
        )}
        <div className={styles.contentContainer}>
          <p>{props.description}</p>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={props.onCancel} />
    </>
  );
};

export default NoticeModal;
