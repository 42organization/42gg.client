import { agendaModal } from 'types/agenda/modalTypes';
import styles from 'styles/agenda/modal/modal.module.scss';

interface FormComponentProps {
  isAdmin?: boolean;
  data: any;
  stringKey?: string;
  onProceed?: () => void;
}

interface ModifyModalProps extends agendaModal {
  FormComponent?: React.FC<FormComponentProps>;
}

const ModifyModal: React.FC<ModifyModalProps> = (props) => {
  const {
    title,
    description,
    FormComponent,
    data,
    isAdmin,
    stringKey,
    onProceed,
  } = props;

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
            <FormComponent
              isAdmin={isAdmin}
              data={data}
              stringKey={stringKey}
              onProceed={onProceed}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyModal;
