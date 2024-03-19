import { MutableRefObject, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  IApplicantAnswer,
  ICheck,
  IQuestionForm,
  refMap,
} from 'types/recruit/recruitments';
import {
  findUserAnswer,
  inputDefault,
  updateUserAnswers,
} from 'utils/handleApplicationForm';
import {
  applicationFormTypeState,
  userApplicationAnswerState,
} from 'utils/recoil/application';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IitemProps {
  form: IQuestionForm;
  formRefs: MutableRefObject<refMap>;
}

export default function SingleCheckForm(props: IitemProps) {
  const { form, formRefs } = props;
  const mode = useRecoilValue(applicationFormTypeState);
  const [input, setInput] = useState<IApplicantAnswer>(inputDefault(form));
  const [userAnswers, setUserAnswers] = useRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  const onChange = (checkId: number) => {
    setInput((prev) => ({ ...prev, checkedList: [checkId] }));
  };

  useEffect(() => {
    if (mode === 'VIEW' || mode === 'EDIT') {
      const userAnswer = findUserAnswer(form.questionId, userAnswers);
      setInput(userAnswer ? userAnswer : inputDefault(form));
    }
  }, [mode, userAnswers]);

  useEffect(() => {
    updateUserAnswers({ updateAnswer: input, userAnswers, setUserAnswers });
  }, [input]);

  return (
    <FormControl>
      <div className={applicationStyle.questionText}>{form.question}</div>
      <RadioGroup
        className={applicationStyle.radioBoxGroup}
        aria-labelledby={'radio-buttons-group-label' + form.questionId}
        name={'radio-buttons-group' + form.questionId}
      >
        {form.checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              className={applicationStyle.radioBox}
              key={check.id}
              value={check.contents}
              control={
                <Radio
                  onChange={() => onChange(check.id)}
                  checked={input.checkedList?.includes(check.id)}
                />
              }
              label={check.contents}
              disabled={mode === 'VIEW' ? true : false}
              inputRef={(ref) => (formRefs.current[form.questionId] = ref)}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
