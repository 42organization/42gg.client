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

  const submitApplicationForm = () => {
    const answerList = [];
    for (const answer of formRefs.current) {
      if (answer.type === 'TEXT') {
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
    setModal({
      modalName: 'RECRUITMENT-APPLY',
      recruitId: recruitId,
      applicantAnswers: answerList,
    });
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>지원서 항목이 없습니다</div>;
  }

  return (
    <div>
      <div className={applicationStyle.titleContainer}>{data.title}</div>
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
          sx={{ borderRadius: '1rem', fontSize: '1.5rem' }}
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
    <div>
      <div className={applicationStyle.questionText}>{question}</div>
      <TextField
        id='filled-basic'
        label='Filled'
        variant='filled'
        inputRef={(ref) =>
          refs.current.push({ id: qestionId, type: 'TEXT', ref: ref })
        }
      />
    </div>
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
        aria-labelledby='radio-buttons-group-label'
        name='radio-buttons-group'
      >
        {checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
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
    <div>
      <div className={applicationStyle.questionText}>{question}</div>
      <FormGroup>
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
    </div>
  );
}
