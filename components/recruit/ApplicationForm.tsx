import { useRouter } from 'next/router';
import { MutableRefObject, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {
  ICheck,
  IQuestionForm,
  recruitmentQuestionTypes,
} from 'types/recruit/recruitments';
import { modalState } from 'utils/recoil/modal';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IRefs {
  id: number;
  type: recruitmentQuestionTypes;
  checkId?: number;
  ref: HTMLInputElement;
}

export default function ApplicationForm({ recruitId }: { recruitId: number }) {
  const { data, isLoading } = useRecruitDetail({ recruitId });
  const setModal = useSetRecoilState(modalState);
  const formRefs = useRef<IRefs[]>([]);
  const router = useRouter();

  const submitApplicationForm = () => {
    const answerList = [];
    for (const answer of formRefs.current) {
      if (answer.type === 'TEXT' && answer.ref?.value.length !== 0) {
        answerList.push({
          questionsId: answer.id,
          inputType: answer.type,
          answer: answer.ref?.value,
        });
      } else if (
        answer.type === 'SINGLE_CHECK' ||
        answer.type === 'MULTI_CHECK'
      ) {
        if (answer.ref?.checked === false) continue;
        const foundObj = answerList.find(
          (obj) => obj.questionsId === answer.id
        );

        if (foundObj === undefined) {
          answerList.push({
            questionsId: answer.id,
            inputType: answer.type,
            checkedList: [Number(answer.checkId)],
          });
        } else {
          foundObj.checkedList?.push(Number(answer.checkId));
        }
      }
    }
    if (answerList.length === 0) return;
    console.log(answerList);
    setModal({
      modalName: 'RECRUITMENT-APPLY',
      recruitId: recruitId,
      applicantAnswers: answerList,
    });
  };

  const goBack = () => {
    router.back();
  };

  if (isLoading || !data || Object.keys(data).length === 0) {
    return (
      <div className={applicationStyle.form}>
        <div className={applicationStyle.titleContainer}></div>
        <div className={applicationStyle.questionContainer}>
          <div className={applicationStyle.backTitle}>
            {isLoading ? '로딩중...' : '지원서 항목이 없습니다'}
          </div>
          <Button
            className={applicationStyle.backBtn}
            variant='contained'
            onClick={goBack}
          >
            뒤로가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={applicationStyle.form}>
      <div className={applicationStyle.titleContainer}>
        {data.title} {data.generations} 모집
      </div>
      <div className={applicationStyle.bodyContainer}>
        {data.form.map((form: IQuestionForm, index: number) => (
          <div className={applicationStyle.questionContainer} key={index}>
            {form.inputType === 'TEXT' ? (
              <TextForm
                question={form.question}
                qestionId={form.questionId}
                refs={formRefs}
              />
            ) : form.inputType === 'SINGLE_CHECK' ? (
              <SingleCheckForm
                question={form.question}
                checkList={form.checkList}
                qestionId={form.questionId}
                refs={formRefs}
              />
            ) : form.inputType === 'MULTI_CHECK' ? (
              <MultiCheckForm
                question={form.question}
                checkList={form.checkList}
                qestionId={form.questionId}
                refs={formRefs}
              />
            ) : (
              <div>유효하지 않은 폼</div>
            )}
          </div>
        ))}
      </div>
      <div className={applicationStyle.btnContainer}>
        <Button
          className={applicationStyle.submitBtn}
          variant='contained'
          onClick={() => submitApplicationForm()}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}

function TextForm({
  question,
  qestionId,
  refs,
}: {
  question: string;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
}) {
  return (
    <>
      <div className={applicationStyle.questionText}>{question}</div>
      <TextField
        className={applicationStyle.textField}
        label='답변을 적어주세요'
        multiline
        rows={5}
        inputRef={(ref) =>
          refs.current.push({ id: qestionId, type: 'TEXT', ref: ref })
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
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
}) {
  return (
    <FormControl>
      <div className={applicationStyle.questionText}>{question}</div>
      <RadioGroup
        className={applicationStyle.radioBoxGroup}
        aria-labelledby='radio-buttons-group-label'
        name='radio-buttons-group'
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
                refs.current.push({
                  id: qestionId,
                  type: 'SINGLE_CHECK',
                  checkId: check.id,
                  ref: ref,
                })
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
}: {
  question: string;
  checkList: ICheck[] | undefined;
  qestionId: number;
  refs: MutableRefObject<IRefs[]>;
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
                refs.current.push({
                  id: qestionId,
                  type: 'SINGLE_CHECK',
                  checkId: check.id,
                  ref: ref,
                })
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
