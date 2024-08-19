import { agendaModal } from 'types/agenda/modalTypes';
import { useModal } from 'components/agenda/modal/useModal';
import styles from 'styles/agenda/modal/modal.module.scss';

const ModifyModal = (
  props: agendaModal & {
    FormComponent: React.ComponentType<{
      data: any;
    }>;
  }
) => {
  const { title, description, onCancel, onProceed, FormComponent, data } =
    props;
  const { handleCancel, handleProceed } = useModal();
  return (
    <>
      <div className={`${styles.modalContainer} ${styles.wide}`}>
        {title && (
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={`${styles.contentContainer} ${styles.left}`}>
          {description}
        </div>
        <div className={styles.formContainer}>
          <FormComponent data={data} />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleCancel(onCancel)}>취소</button>
          <button onClick={() => handleProceed(onProceed)}>수정</button>{' '}
        </div>
      </div>
    </>
  );
};

export default ModifyModal;
