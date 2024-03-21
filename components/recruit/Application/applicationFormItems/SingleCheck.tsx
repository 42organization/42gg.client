import { MutableRefObject, useEffect, useState } from 'react';
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
  refMap,
} from 'types/recruit/recruitments';
import styles from 'styles/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  formRefs: MutableRefObject<refMap>;
  mode: ApplicationFormType;
  answer: IApplicantAnswer | null;
}

export default function SingleCheckForm(props: IitemProps) {
  const { form, formRefs, mode, answer } = props;
  const [singleCheck, setSingleCheck] = useState<number[]>([]);

  // radio box는 defaultChecked가 적용되지 않아서 state 추가
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCheck([Number(e.target.value)]);
  };

  useEffect(() => {
    if (answer && answer.checkedList) setSingleCheck(answer?.checkedList);
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
              inputRef={(ref) => (formRefs.current[form.questionId] = ref)}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
