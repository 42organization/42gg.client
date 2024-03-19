import { MutableRefObject, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TextField } from '@mui/material';
import {
  IApplicantAnswer,
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

export default function TextForm(props: IitemProps) {
  const { form, formRefs } = props;
  const mode = useRecoilValue(applicationFormTypeState);
  const [input, setInput] = useState<IApplicantAnswer>(inputDefault(form));
  const [userAnswers, setUserAnswers] = useRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, answer: event.target.value }));
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
    <>
      <div className={applicationStyle.questionText}>{form.question}</div>
      <TextField
        className={applicationStyle.textField}
        label={mode === 'APPLY' ? '답변을 적어주세요' : ''}
        multiline
        rows={5}
        color={'info'}
        onChange={onChange}
        disabled={mode === 'VIEW' ? true : false}
        value={input.answer}
        inputRef={(ref) => (formRefs.current[form.questionId] = ref)}
      />
    </>
  );
}
