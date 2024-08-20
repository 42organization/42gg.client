import styles from 'styles/agenda/Form/Form.module.scss';
import AgendaForm from './AgendaFrom';
interface CreateAgendaFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateAgendaForm = ({ handleSubmit }: CreateAgendaFormProps) => {
  const submitId = 'createAgenda';

  return (
    <>
      <AgendaForm handleSubmit={handleSubmit} submitId={submitId} />
      <div className={styles.bottomContainer}>
        <div className={styles.buttonContainer}>
          <button type='submit' form={submitId}>
            아젠다만들기
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateAgendaForm;
