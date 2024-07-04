import { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  ICheck,
  IQuestionForm,
} from 'types/takgu/recruit/recruitments';
import styles from 'styles/takgu/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  mode: ApplicationFormType;
  answer: IApplicantAnswer | null;
}

function SingleCheckForm(props: IitemProps) {
  const { form, mode, answer } = props;
  const [singleCheck, setSingleCheck] = useState<number[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCheck([Number(e.target.value)]);
  };

  useEffect(() => {
    if (answer && answer.checkedList)
      setSingleCheck(answer?.checkedList.map((check) => check.checkListId));
  }, [answer]);

  return (
    <FormControl>
      <div className={styles.questionText}>{form.question}</div>
      <RadioGroup
        className={styles.radioBoxGroup}
        aria-labelledby={'radio-buttons-group-label' + form.questionId}
        name={form.questionId.toString()}
      >
        {form.checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              className={styles.radioBox}
              key={check.id}
              value={check.id}
              control={
                <Radio
                  checked={singleCheck.includes(check.id)}
                  onChange={onChange}
                />
              }
              label={check.contents}
              disabled={mode === 'VIEW'}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleCheckForm;
