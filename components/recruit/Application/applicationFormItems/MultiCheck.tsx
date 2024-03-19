import { MutableRefObject, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

export default function MultiCheckForm(props: IitemProps) {
  const { form, formRefs } = props;
  const mode = useRecoilValue(applicationFormTypeState);
  const [input, setInput] = useState<IApplicantAnswer>(inputDefault(form));
  const [userAnswers, setUserAnswers] = useRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  const onChange = (checkId: number) => {
    if (input.checkedList?.includes(checkId)) {
      setInput((prev) => ({
        ...prev,
        checkedList: input.checkedList?.filter((el) => el !== checkId),
      }));
    } else {
      if (input.checkedList) {
        const updateCheckedList = [...input.checkedList];
        updateCheckedList.push(checkId);
        updateCheckedList.sort((a, b) => a - b);
        setInput((prev) => ({ ...prev, checkedList: updateCheckedList }));
      }
    }
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
      <FormGroup className={applicationStyle.checkBoxGroup}>
        {form.checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              key={check.id}
              value={check.contents}
              control={
                <Checkbox
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
      </FormGroup>
    </FormControl>
  );
}
