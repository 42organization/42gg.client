import { agendaModal } from 'types/agenda/modalTypes';
import ModifyAgendaForm from 'components/agenda/Form/ModifyAgendaForm';
import { useModal } from 'components/agenda/modal/useModal';
import { submitTeamForm } from 'pages/agenda/create';
import styles from 'styles/agenda/modal/modal.module.scss';

const ModifyModal = (props: agendaModal) => {
  const { title, description, onCancel, onProceed, data } = props;
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
          <ModifyAgendaForm data={data} handleSubmit={submitTeamForm} />
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
