import { MutableRefObject } from 'react';
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
  refMap,
} from 'types/recruit/recruitments';
import styles from 'styles/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  formRefs: MutableRefObject<refMap>;
  mode: ApplicationFormType;
  answer: IApplicantAnswer | null;
}

export default function MultiCheckForm(props: IitemProps) {
  const { form, formRefs, mode, answer } = props;

  return (
    <FormControl>
      <div className={styles.questionText}>{form.question}</div>
      <FormGroup className={styles.checkBoxGroup}>
        {form.checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
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
              inputRef={(ref) => (formRefs.current[form.questionId] = ref)}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
