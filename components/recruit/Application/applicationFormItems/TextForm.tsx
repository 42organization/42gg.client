import { MutableRefObject } from 'react';
import { TextField } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
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

export default function TextForm(props: IitemProps) {
  const { form, formRefs, mode, answer } = props;

  return (
    <>
      <div className={styles.questionText}>{form.question}</div>
      <TextField
        className={styles.textField}
        label={mode === 'APPLY' ? '답변을 적어주세요' : ''}
        name={form.questionId.toString()}
        multiline
        rows={5}
        color={'info'}
        disabled={mode === 'VIEW'}
        value={answer && answer.answer}
        inputRef={(ref) => (formRefs.current[form.questionId] = ref)}
      />
    </>
  );
}
