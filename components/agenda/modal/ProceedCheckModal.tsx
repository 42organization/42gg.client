import { agendaModal } from 'types/agenda/modalTypes';
import styles from 'styles/agenda/modal/modal.module.scss';

const ProceedCheckModal = (props: agendaModal) => {
  const {
    type,
    title,
    description,
    contentsToCheck,
    onProceed,
    onCancel,
    proceedText,
    cancelText,
    extraButtons,
  } = props;

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
          {contentsToCheck && (
            <div className={styles.contentsToCheckContainer}>
              {Object.keys(contentsToCheck).map((key, idx) => {
                if (!contentsToCheck || !contentsToCheck[key]) return null;
                return (
                  <div key={idx} className={styles.contentsToCheck}>
                    <p>{key}</p>
                    <p>{contentsToCheck[key]}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onCancel}>{cancelText || '취소'}</button>
          <button onClick={onProceed}>{proceedText || '확인'}</button>
        </div>
      </div>
    </>
  );
};

export default ProceedCheckModal;
