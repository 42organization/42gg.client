import { MutableRefObject, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  ICheck,
  IQuestionForm,
  IRecruitmentDetail,
} from 'types/recruit/recruitments';
import { userApplicationAnswerState } from 'utils/recoil/application';
import {
  findUserAnswer,
  inputDefault,
  updateUserAnswers,
} from 'components/recruit/ApplicationForm/applicationFormUtils';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IQuestionProps {
  data: IRecruitmentDetail;
  mode: ApplicationFormType;
  formRefs: MutableRefObject<{ [key: number]: HTMLInputElement }>;
}

export default function ApplicationFormItem(props: IQuestionProps) {
  const { data, mode, formRefs } = props;
  return (
    <>
      {data.form.map((form: IQuestionForm, index: number) => (
        <Paper className={applicationStyle.questionContainer} key={index}>
          {form.inputType === 'TEXT' ? (
            <TextForm form={form} mode={mode} formRefs={formRefs} />
          ) : form.inputType === 'SINGLE_CHECK' ? (
            <SingleCheckForm form={form} mode={mode} formRefs={formRefs} />
          ) : form.inputType === 'MULTI_CHECK' ? (
            <MultiCheckForm form={form} mode={mode} formRefs={formRefs} />
          ) : (
            <span>유효하지 않은 폼입니다</span>
          )}
        </Paper>
      ))}
    </>
  );
}

function TextForm({
  form,
  mode,
  formRefs,
}: {
  form: IQuestionForm;
  mode: ApplicationFormType;
  formRefs: MutableRefObject<{ [key: number]: HTMLInputElement }>;
}) {
  const [input, setInput] = useState<IApplicantAnswer>(inputDefault(form));
  const [userAnswers, setUserAnswers] = useRecoilState<IApplicantAnswer[]>(
    userApplicationAnswerState
  );

  const onChange = (event: any) => {
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

function SingleCheckForm({
  form,
  mode,
  formRefs,
}: {
  form: IQuestionForm;
  mode: ApplicationFormType;
  formRefs: MutableRefObject<{ [key: number]: HTMLInputElement }>;
}) {
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

function MultiCheckForm({
  form,
  mode,
  formRefs,
}: {
  form: IQuestionForm;
  mode: ApplicationFormType;
  formRefs: MutableRefObject<{ [key: number]: HTMLInputElement }>;
}) {
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
