import { MutableRefObject } from 'react';
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
  ICheck,
  IQuestionForm,
  IRecruitmentDetail,
  IRefs,
} from 'types/recruit/recruitments';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IQuestionProps {
  data: IRecruitmentDetail;
  refs: MutableRefObject<IRefs[]>;
}

export default function ApplicationQuestions(props: IQuestionProps) {
  const { data, refs } = props;

  return (
    <>
      {data.form.map((form: IQuestionForm, index: number) => (
        <Paper className={applicationStyle.questionContainer} key={index}>
          {form.inputType === 'TEXT' ? (
            // todo: required 추가 필요?
            <TextForm
              question={form.question}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
            />
          ) : form.inputType === 'SINGLE_CHECK' ? (
            <SingleCheckForm
              question={form.question}
              checkList={form.checkList}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
            />
          ) : form.inputType === 'MULTI_CHECK' ? (
            <MultiCheckForm
              question={form.question}
              checkList={form.checkList}
              qestionId={form.questionId}
              refs={refs}
              refIndex={index}
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
}: {
  question: string;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
}) {
  return (
    <>
      <div className={applicationStyle.questionText}>{question}</div>
      <TextField
        className={applicationStyle.textField}
        label='답변을 적어주세요'
        multiline
        rows={5}
        color={'info'}
        inputRef={(ref) =>
          (refs.current[refIndex] = { id: qestionId, type: 'TEXT', ref: [ref] })
        }
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
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
}) {
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
              control={<Radio />}
              label={check.contents}
              inputRef={(ref) =>
                refs.current[refIndex] === undefined
                  ? (refs.current[refIndex] = {
                      id: qestionId,
                      type: 'SINGLE_CHECK',
                      // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
                      ref: [null, ref],
                    })
                  : (refs.current[refIndex].ref[check.id] = ref)
              }
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
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
  refIndex: number;
}) {
  return (
    <FormControl>
      <div className={applicationStyle.questionText}>{question}</div>
      <FormGroup className={applicationStyle.checkBoxGroup}>
        {checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              key={check.id}
              value={check.contents}
              control={<Checkbox />}
              label={check.contents}
              inputRef={(ref) =>
                refs.current[refIndex] === undefined
                  ? (refs.current[refIndex] = {
                      id: qestionId,
                      type: 'MULTI_CHECK',
                      // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
                      ref: [null, ref],
                    })
                  : (refs.current[refIndex].ref[check.id] = ref)
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
