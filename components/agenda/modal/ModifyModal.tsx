import { agendaModal } from 'types/agenda/modalTypes';
import { useModal } from 'components/agenda/modal/useModal';
import { SubmitTeamForm } from 'pages/agenda/create';
import styles from 'styles/agenda/modal/modal.module.scss';

interface FormComponentProps {
  data: any;
  submitId: string;
}

interface ModifyModalProps extends agendaModal {
  FormComponent?: React.FC<FormComponentProps>;
}

const ModifyModal: React.FC<ModifyModalProps> = (props) => {
  const { title, description, onCancel, FormComponent, data, submitId } = props;
  const { handleCancel } = useModal();
  const submitIdString = submitId ? submitId : '';

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
          {FormComponent && (
            <FormComponent data={data} submitId={submitIdString} />
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleCancel(onCancel)}>취소</button>
          <button type='submit' form={submitId}>
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default ModifyModal;
