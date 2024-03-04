import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { instance } from 'utils/axios';
import { dateToString } from 'utils/handleTime';

enum eFormType {
  TEXT,
  SINGLE_CHECK,
  MULTI_CHECK,
}

interface IForm {
  questionId: number;
  question: string;
  inputType: eFormType;
  checkList?: { id: number; contents: string }[];
}

interface IRecruitment {
  startDate: string;
  endDate: string;
  title: string;
  contents: string;
  generations: string;
  form: IForm[];
}

export default function ApplicationForm({ id }: { id: number }) {
  const [recruitement, setRecruitment] = useState<IRecruitment>({
    startDate: '2024-03-04 12:12',
    endDate: '2024-03-04 14:12',
    title: '42GG 모집',
    contents: '지원서',
    generations: '7기',
    form: [
      {
        questionId: 1,
        question: '지원동기를 적어주세요',
        inputType: eFormType.TEXT,
      },
      {
        questionId: 2,
        question: '본인의 기수를 선택해주세요',
        inputType: eFormType.SINGLE_CHECK,
        checkList: [
          { id: 1, contents: '1' },
          { id: 2, contents: '2' },
          { id: 3, contents: '3' },
        ],
      },
      {
        questionId: 3,
        question: '기술스택을 선택해주세요',
        inputType: eFormType.MULTI_CHECK,
        checkList: [
          { id: 1, contents: 'C' },
          { id: 2, contents: 'C++' },
          { id: 3, contents: 'C#' },
        ],
      },
    ],
  });

  const getRecruitment = async (id: number) => {
    try {
      const res = await instance.get(`/recruitments/${id}`);
      setRecruitment({
        ...res.data,
        startDate: dateToString(res.data.startDate),
        endDate: dateToString(res.data.endDate),
      });
    } catch (e) {
      console.error('HJ00');
    }
  };

  // useEffect(() => {
  //     getRecruitment(id);
  // }, [])

  // title
  // 객관식 질문
  // 주관식 질문
  return (
    <div>
      <div>{recruitement.title}</div>

      <div>
        {recruitement.form.map((form, index) => (
          <div key={index}>
            <div>{form.question}</div>
            {form.inputType === eFormType.TEXT ? (
              <TextForm />
            ) : form.inputType === eFormType.SINGLE_CHECK ? (
              <SingleCheckForm />
            ) : form.inputType === eFormType.MULTI_CHECK ? (
              <MultiCheckForm />
            ) : (
              <div>유효하지 않은 폼</div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Button variant='contained'>제출하기</Button>
      </div>
    </div>
  );
}

function TextForm() {
  return <TextField id='filled-basic' label='Filled' variant='filled' />;
}

function SingleCheckForm() {
  return (
    <FormControl>
      <FormLabel id='radio-buttons-group-label'>질문 내용</FormLabel>
      <RadioGroup
        aria-labelledby='radio-buttons-group-label'
        defaultValue={'test3'}
        name='radio-buttons-group'
      >
        <FormControlLabel value='test1' control={<Radio />} label='test1' />
        <FormControlLabel value='test2' control={<Radio />} label='test2' />
        <FormControlLabel value='test3' control={<Radio />} label='test3' />
      </RadioGroup>
    </FormControl>
  );
}

function MultiCheckForm() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label='one' />
      <FormControlLabel control={<Checkbox defaultChecked />} label='two' />
      <FormControlLabel control={<Checkbox defaultChecked />} label='three' />
    </FormGroup>
  );
}
