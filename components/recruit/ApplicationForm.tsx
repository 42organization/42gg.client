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
import { ICheck, IQuestionForm } from 'types/recruit/recruitments';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import applicationStyle from 'styles/recruit/application.module.scss';

export default function ApplicationForm({ id }: { id: number }) {
  const { data, isLoading } = useRecruitDetail({ id });

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
              <TextForm question={form.question} />
            ) : form.inputType === 'SINGLE_CHECK' ? (
              <SingleCheckForm
                question={form.question}
                checkList={form.checkList}
              />
            ) : form.inputType === 'MULTI_CHECK' ? (
              <MultiCheckForm
                question={form.question}
                checkList={form.checkList}
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
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}

function TextForm({ question }: { question: string }) {
  return (
    <div>
      <div className={applicationStyle.questionText}>{question}</div>
      <TextField id='filled-basic' label='Filled' variant='filled' />
    </div>
  );
}

function SingleCheckForm({
  question,
  checkList,
}: {
  question: string;
  checkList: ICheck[] | undefined;
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
}: {
  question: string;
  checkList: ICheck[] | undefined;
}) {
  return (
    <div>
      <div className={applicationStyle.questionText}>{question}</div>
      <FormGroup>
        {checkList?.map((check: ICheck) => {
          return (
            <FormControlLabel
              key={check.id}
              control={<Checkbox />}
              label={check.contents}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
