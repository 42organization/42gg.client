import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  ICheck,
  IQuestionForm,
} from 'types/recruit/recruitments';
import styles from 'styles/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  mode: ApplicationFormType;
  answer: IApplicantAnswer | null;
}

function MultiCheckForm(props: IitemProps) {
  const { form, mode, answer } = props;

  return (
    <FormControl>
      <div className={styles.questionText}>{form.question}</div>
      <FormGroup className={styles.checkBoxGroup}>
        {form.checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              className={styles.checkBox}
              name={form.questionId.toString()}
              key={check.id}
              value={check.id}
              control={
                <Checkbox
                  defaultChecked={answer?.checkedList?.includes(check.id)}
                />
              }
              label={check.contents}
              disabled={mode === 'VIEW'}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}

export default MultiCheckForm;
