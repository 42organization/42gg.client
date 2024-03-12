import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@mui/material';
import {
  IApplicantAnswer,
  ICheck,
  IQuestionForm,
  recruitmentQuestionTypes,
} from 'types/recruit/recruitments';
import ApplyModal from 'components/modal/recruitment/ApplyModal';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import applicationStyle from 'styles/recruit/application.module.scss';

interface IRefs {
  id: number;
  type: recruitmentQuestionTypes;
  ref: HTMLInputElement[];
}

export default function ApplicationForm({ recruitId }: { recruitId: number }) {
  const { data, isLoading } = useRecruitDetail({ recruitId });
  const formRefs = useRef<IRefs[]>([]);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [answerListState, setAnswerListState] = useState<IApplicantAnswer[]>(
    []
  );
  const [alertOn, setAlertOn] = useState(false);

  const closeAlert = () => {
    setAlertOn(false);
  };

  // todo: 응답하지 않은 질문으로 포커싱 필요?
  const submitApplicationForm = () => {
    const answerList = [];
    for (const answer of formRefs.current) {
      let requiredFlag = false;
      if (answer.type === 'TEXT' && answer.ref[0].value.length !== 0) {
        answerList.push({
          questionId: answer.id,
          inputType: answer.type,
          answer: answer.ref[0].value,
        });
        requiredFlag = true;
      } else if (answer.type === 'SINGLE_CHECK') {
        for (const checkRef of answer.ref) {
          if (!checkRef || checkRef?.checked === false) continue;
          answerList.push({
            questionId: answer.id,
            inputType: answer.type,
            checkList: [Number(answer.ref.indexOf(checkRef))],
          });
          requiredFlag = true;
          break;
        }
      } else if (answer.type === 'MULTI_CHECK') {
        for (const checkRef of answer.ref) {
          if (!checkRef || checkRef?.checked === false) continue;
          const foundObj = answerList.find(
            (obj) => obj.questionId === answer.id
          );
          if (foundObj === undefined) {
            answerList.push({
              questionId: answer.id,
              inputType: answer.type,
              // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
              checkedList: [Number(answer.ref.indexOf(checkRef))],
            });
          } else {
            // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
            foundObj.checkedList?.push(Number(answer.ref.indexOf(checkRef)));
          }
          requiredFlag = true;
        }
      }

      // 채워지지 않은 폼으로 이동
      if (!requiredFlag) {
        if (answer.type === 'TEXT') {
          answer.ref[0].focus();
        } else {
          // todo: checklist id번호 들어오는 방식 체크 필요 0,1,2 or 1,2,3
          answer.ref[1].focus();
        }
        setAlertOn(true);
        return;
      }
    }
    // test용 console
    console.log(
      '폼 질문 개수: ',
      data?.form.length,
      ' 응답 개수: ',
      answerList.length
    );
    console.log('응답: ', answerList);
    if (answerList.length === 0 || answerList.length !== data?.form.length)
      return;
    setAnswerListState(answerList);
    setModalOpen(true);
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      setAlertOn(true);
    }
  }, [data]);

  if (isLoading || !data || Object.keys(data).length === 0) {
    return (
      <Box>
        <Grid className={applicationStyle.form}>
          <Paper className={applicationStyle.titleContainer}>42GG 모집</Paper>
          <Paper className={applicationStyle.questionContainer}>
            <div className={applicationStyle.backTitle}>
              {isLoading ? '로딩중...' : ''}
            </div>
            <Button
              className={applicationStyle.backBtn}
              variant='contained'
              onClick={goBack}
            >
              뒤로가기
            </Button>
          </Paper>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={alertOn}
          autoHideDuration={5000}
          onClose={closeAlert}
        >
          <Alert onClose={closeAlert} severity='error' variant='filled'>
            올바르지 않은 요청입니다.
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box>
      <Grid
        className={applicationStyle.form}
        container
        direction={'column'}
        rowSpacing={2}
      >
        <Paper className={applicationStyle.titleContainer}>
          {data?.title} {data?.generations} 모집
        </Paper>
        {data?.form?.map((form: IQuestionForm, index: number) => (
          <Paper className={applicationStyle.questionContainer} key={index}>
            {form.inputType === 'TEXT' ? (
              // todo: required 추가 필요?
              <TextForm
                question={form.question}
                questionId={form.questionId}
                refs={formRefs}
                refIndex={index}
              />
            ) : form.inputType === 'SINGLE_CHECK' ? (
              <SingleCheckForm
                question={form.question}
                checkList={form.checkList}
                questionId={form.questionId}
                refs={formRefs}
                refIndex={index}
              />
            ) : form.inputType === 'MULTI_CHECK' ? (
              <MultiCheckForm
                question={form.question}
                checkList={form.checkList}
                questionId={form.questionId}
                refs={formRefs}
                refIndex={index}
              />
            ) : (
              <span>유효하지 않은 폼입니다</span>
            )}
          </Paper>
        ))}
        <Button
          className={applicationStyle.submitBtn}
          variant='contained'
          onClick={() => submitApplicationForm()}
        >
          제출하기
        </Button>
      </Grid>
      <ApplyModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        recruitId={recruitId}
        applicantAnswers={answerListState}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={alertOn}
        autoHideDuration={5000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity='error' variant='filled'>
          입력하지 않은 문항이 있습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
}

function TextForm({
  question,
  questionId,
  refs,
  refIndex,
}: {
  question: string;
  questionId: number;
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
          (refs.current[refIndex] = {
            id: questionId,
            type: 'TEXT',
            ref: [ref],
          })
        }
      />
    </>
  );
}

function SingleCheckForm({
  question,
  checkList,
  questionId,
  refs,
  refIndex,
}: {
  question: string;
  checkList: ICheck[] | undefined;
  questionId: number;
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
                      id: questionId,
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
  questionId,
  refs,
  refIndex,
}: {
  question: string;
  checkList: ICheck[] | undefined;
  questionId: number;
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
                      id: questionId,
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
