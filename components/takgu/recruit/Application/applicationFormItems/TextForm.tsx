import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  IQuestionForm,
} from 'types/recruit/recruitments';
import styles from 'styles/takgu/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  mode: ApplicationFormType;
  answer: IApplicantAnswer | null;
}

function TextForm(props: IitemProps) {
  const { form, mode, answer } = props;
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (answer && answer.answer) setValue(answer.answer);
  }, [answer]);

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
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default TextForm;
