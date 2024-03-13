import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
  IRefs,
} from 'types/recruit/recruitments';
import useRecruitDetailUser from 'hooks/recruit/useRecruitDetailUser';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IQuestionProps {
  data: IRecruitmentDetail;
  refs: MutableRefObject<IRefs[]>;
  mode: ApplicationFormType;
  recruitId: number;
  applicationId: number;
  answerList: [];
  setAnswerList: Dispatch<SetStateAction<[]>>;
}

export default function ApplicationQuestions(props: IQuestionProps) {
  const {
    data,
    refs,
    mode,
    recruitId,
    applicationId,
    answerList,
    setAnswerList,
  } = props;
  const [userAnswers, setUserAnswers] = useState<
    IApplicantAnswer[] | undefined
  >(undefined);

  const { data: applyInfo, isLoading } = useRecruitDetailUser({
    recruitId: recruitId,
    applicationId: applicationId,
    mode,
  });

  useEffect(() => {
    if (mode === 'VIEW' || mode === 'EDIT') {
      setUserAnswers(applyInfo?.form);
    }
  }, [mode, applyInfo]);

  const findValueText = (questionId: number) => {
    if (!userAnswers) return undefined;
    for (const answer of userAnswers) {
      if (answer.questionId === questionId && answer.inputType === 'TEXT') {
        return answer.answer;
      }
    }
    return undefined;
  };
  const findValueCheck = (questionId: number) => {
    if (!userAnswers) return undefined;
    for (const answer of userAnswers) {
      if (
        answer.questionId === questionId &&
        (answer.inputType === 'SINGLE_CHECK' ||
          answer.inputType === 'MULTI_CHECK')
      )
        return answer.checkedList;
    }
    return undefined;
  };

  return (
    <>
      {data.form.map((form: IQuestionForm, index: number) => (
        <Paper className={applicationStyle.questionContainer} key={index}>
          {form.inputType === 'TEXT' ? (
            <TextForm
              question={form.question}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
              mode={mode}
              value={findValueText(form.questionId)}
              answerList={answerList}
              setAnswerList={setAnswerList}
            />
          ) : form.inputType === 'SINGLE_CHECK' ? (
            <SingleCheckForm
              question={form.question}
              checkList={form.checkList}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
              mode={mode}
              value={findValueCheck(form.questionId)}
            />
          ) : form.inputType === 'MULTI_CHECK' ? (
            <MultiCheckForm
              question={form.question}
              checkList={form.checkList}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
              mode={mode}
              value={findValueCheck(form.questionId)}
            />
          ) : (
            <span>유효하지 않은 폼입니다</span>
          )}
        </Paper>
      ))}
    </>
  );
}

function TextForm({
  question,
  qestionId,
  refs,
  refIndex,
  mode,
  value,
  answerList,
  setAnswerList,
}: {
  question: string;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
  mode: ApplicationFormType;
  value: string | undefined;
  answerList: [];
  setAnswerList: Dispatch<SetStateAction<[]>>;
}) {
  const [val, setVal] = useState<string>('');
  const onChange = (event: any) => {
    setVal(event.target.value);
  };

  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [mode, value]);

  useEffect(() => {
    setAnswerList(...answerList, answerList[refIndex]);
  }, [val]);

  return (
    <>
      <div className={applicationStyle.questionText}>{question}</div>
      <TextField
        className={applicationStyle.textField}
        label={mode === 'VIEW' || mode === 'EDIT' ? '' : '답변을 적어주세요'}
        multiline
        rows={5}
        color={'info'}
        onChange={onChange}
        // inputRef={(ref) =>
        //   (refs.current[refIndex] = { id: qestionId, type: 'TEXT', ref: [ref] })
        // }
        disabled={mode === 'VIEW' ? true : false}
        value={val}
      />
    </>
  );
}

function SingleCheckForm({
  question,
  checkList,
  qestionId,
  refs,
  refIndex,
  mode,
  value,
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
  mode: ApplicationFormType;
  value: number[] | undefined;
}) {
  const [val, setVal] = useState<number[]>([]);
  const onChange = (checkId: number) => (event: any) => {
    setVal([checkId]);
  };

  useEffect(() => {
    if (value) {
      setVal([...value]);
    }
  }, [mode, value]);

  return (
    <FormControl>
      <div className={applicationStyle.questionText}>{question}</div>
      <RadioGroup
        className={applicationStyle.radioBoxGroup}
        aria-labelledby={'radio-buttons-group-label' + refIndex}
        name={'radio-buttons-group' + refIndex}
      >
        {checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              className={applicationStyle.radioBox}
              key={check.id}
              value={check.contents}
              control={
                <Radio
                  onChange={onChange(check.id)}
                  checked={val.includes(check.id)}
                />
              }
              label={check.contents}
              disabled={mode === 'VIEW' ? true : false}
              // inputRef={(ref) =>
              //   refs.current[refIndex] === undefined
              //     ? (refs.current[refIndex] = {
              //         id: qestionId,
              //         type: 'SINGLE_CHECK',
              //         // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
              //         ref: [null, ref],
              //       })
              //     : (refs.current[refIndex].ref[check.id] = ref)
              // }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

function MultiCheckForm({
  question,
  checkList,
  qestionId,
  refs,
  refIndex,
  mode,
  value,
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
  mode: ApplicationFormType;
  value: number[] | undefined;
}) {
  const [val, setVal] = useState<number[]>([]);
  const onChange = (checkId: number) => (event: any) => {
    if (val.includes(checkId)) {
      setVal(val.filter((el) => el !== checkId));
    } else {
      setVal([...val, checkId]);
    }
  };

  useEffect(() => {
    if (value) {
      setVal([...value]);
    }
  }, [mode, value]);

  return (
    <FormControl>
      <div className={applicationStyle.questionText}>{question}</div>
      <FormGroup className={applicationStyle.checkBoxGroup}>
        {checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              key={check.id}
              value={check.contents}
              control={
                <Checkbox
                  onChange={onChange(check.id)}
                  checked={val.includes(check.id)}
                />
              }
              label={check.contents}
              disabled={mode === 'VIEW' ? true : false}
              // inputRef={(ref) =>
              //   refs.current[refIndex] === undefined
              //     ? (refs.current[refIndex] = {
              //         id: qestionId,
              //         type: 'MULTI_CHECK',
              //         // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
              //         ref: [null, ref],
              //       })
              //     : (refs.current[refIndex].ref[check.id] = ref)
              // }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
