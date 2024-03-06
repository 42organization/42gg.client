import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Iquestion } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

function TextInput() {
  return (
    <TextField
      required
      id='question'
      name='question'
      label='질문'
      fullWidth
      size='small'
      // autoComplete='shipping address-line1'
      // variant='standard'
      onChange={(e) => {
        console.log(e.target.value);
      }}
    />
  );
}

function MultiCheckInput() {
  return <div>MultiCheckInput</div>;
}

function SingleCheckInput() {
  return <div>SingleCheckInput</div>;
}

interface QuestionProps {
  idx: number;
  question: Iquestion;
  setQuestionContent: (questionIdx: number, content: string) => void;
  setCheckItemContent: (
    questionIdx: number,
    checkItemIdx: number,
    content: string
  ) => void;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
}

function Question({ idx, question, changeQuestionInputType }: QuestionProps) {
  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    changeQuestionInputType(idx, target.value);
  };

  return (
    <div className={styles.questionContainer}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            required
            name='question'
            label='질문'
            fullWidth
            size='small'
            // autoComplete='shipping address-line1'
            // variant='standard'
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 0, minWidth: 190 }} size='small'>
            <InputLabel>질문 유형</InputLabel>
            <Select
              value={question.inputType}
              label='질문 유형'
              onChange={selectChangehandler}
            >
              <MenuItem value={'TEXT'}>TEXT</MenuItem>
              <MenuItem value={'SINGLE_CHECK'}>SINGLE_CHECK</MenuItem>
              <MenuItem value={'MULTI_CHECK'}>MULTI_CHECK</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          {/* {question.inputType === 'TEXT' && <TextInput />} */}
          {question.inputType === 'SINGLE_CHECK' && <SingleCheckInput />}
          {question.inputType === 'MULTI_CHECK' && <MultiCheckInput />}
        </Grid>
        {/* <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
      </Grid>
    </div>
  );
}

interface QuestionFormBuilderProps {
  form: Iquestion[];
  setQuestionContent: (questionIdx: number, content: string) => void;
  setCheckItemContent: (
    questionIdx: number,
    checkItemIdx: number,
    content: string
  ) => void;
  addEmptyQuestion: (questionIdx: number, inputType: string) => void;
  addCheckItemToQuestion: (questionIdx: number) => void;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
}

export default function QuestionFormBuilder({
  form,
  setQuestionContent,
  setCheckItemContent,
  addEmptyQuestion,
  addCheckItemToQuestion,
  changeQuestionInputType,
}: QuestionFormBuilderProps) {
  const addQuestionHandler = () => {
    addEmptyQuestion(form.length - 1, 'TEXT');
  };
  return (
    <>
      <div className={styles.mainContainer}>
        {form.map((question, idx) => {
          return (
            <Question
              key={idx}
              idx={idx}
              question={question}
              setQuestionContent={setQuestionContent}
              setCheckItemContent={setCheckItemContent}
              changeQuestionInputType={changeQuestionInputType}
            />
          );
        })}
      </div>
      <div className={styles.editConsole}>
        <button onClick={addQuestionHandler}>질문지 항목 추가하기</button>
      </div>
    </>
  );
}
