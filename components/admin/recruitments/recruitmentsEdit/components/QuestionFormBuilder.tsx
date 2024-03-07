import React from 'react';
import { CheckBox } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { IcheckItem, Iquestion } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

interface CheckInputProps {
  checkList: IcheckItem[] | undefined;
  questionIdx: number;
  setCheckItemContent: (
    questionIdx: number,
    checkItemIdx: number,
    content: string
  ) => void;
  addCheckItemToQuestion: (questionIdx: number) => void;
  removeCheckItemFromQuestion: (
    questionIdx: number,
    checkItemIdx: number
  ) => void;
}

function MultiCheckInput({
  checkList,
  questionIdx,
  setCheckItemContent,
  addCheckItemToQuestion,
  removeCheckItemFromQuestion,
}: CheckInputProps) {
  const inputChangeHandler = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setCheckItemContent(questionIdx, idx, target.value);
  };
  return (
    <>
      {checkList &&
        checkList.map((checkItem, idx) => {
          return (
            <Grid container key={idx} style={{ marginBottom: '0.2rem' }}>
              <Grid item xs={1} alignItems='center'>
                <CheckBox />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  required
                  label='직접입력'
                  value={checkItem.content}
                  size='small'
                  variant='standard'
                  onChange={(e) => inputChangeHandler(e, idx)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label='delete'
                  onClick={() => removeCheckItemFromQuestion(idx, questionIdx)}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton
        aria-label='addCheckItem'
        onClick={() => addCheckItemToQuestion(questionIdx)}
      >
        <AddIcon />
      </IconButton>
    </>
  );
}

function SingleCheckInput({
  checkList,
  questionIdx,
  setCheckItemContent,
  addCheckItemToQuestion,
  removeCheckItemFromQuestion,
}: CheckInputProps) {
  const inputChangeHandler = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setCheckItemContent(questionIdx, idx, target.value);
  };

  return (
    <RadioGroup>
      {checkList &&
        checkList.map((checkItem, idx) => {
          return (
            <Grid container key={idx} style={{ marginBottom: '0.2rem' }}>
              <Grid item xs={1}>
                <Radio value={idx} />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  required
                  label='직접입력'
                  value={checkItem.content}
                  size='small'
                  variant='standard'
                  onChange={(e) => inputChangeHandler(e, idx)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label='delete'
                  onClick={() => removeCheckItemFromQuestion(idx, questionIdx)}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton
        aria-label='addCheckItem'
        onClick={() => addCheckItemToQuestion(questionIdx)}
      >
        <AddIcon />
      </IconButton>
    </RadioGroup>
  );
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
  addCheckItemToQuestion: (questionIdx: number) => void;
  removeQuestion: (questionIdx: number) => void;
  removeCheckItemFromQuestion: (
    questionIdx: number,
    checkItemIdx: number
  ) => void;
}

function Question({
  idx,
  question,
  setQuestionContent,
  setCheckItemContent,
  changeQuestionInputType,
  addCheckItemToQuestion,
  removeQuestion,
  removeCheckItemFromQuestion,
}: QuestionProps) {
  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    changeQuestionInputType(idx, target.value);
  };

  const inputChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionContent(idx, target.value);
  };

  return (
    <div className={styles.questionWrapper}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            required
            name='question'
            label='질문'
            fullWidth
            value={question.question}
            size='small'
            onChange={inputChangeHandler}
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
        <Grid item xs={12}>
          {question.inputType === 'SINGLE_CHECK' && (
            <SingleCheckInput
              questionIdx={idx}
              checkList={question.checkList}
              setCheckItemContent={setCheckItemContent}
              addCheckItemToQuestion={addCheckItemToQuestion}
              removeCheckItemFromQuestion={removeCheckItemFromQuestion}
            />
          )}
          {question.inputType === 'MULTI_CHECK' && (
            <MultiCheckInput
              questionIdx={idx}
              checkList={question.checkList}
              setCheckItemContent={setCheckItemContent}
              addCheckItemToQuestion={addCheckItemToQuestion}
              removeCheckItemFromQuestion={removeCheckItemFromQuestion}
            />
          )}
        </Grid>
        <IconButton aria-label='delete' onClick={() => removeQuestion(idx)}>
          <DeleteIcon />
        </IconButton>
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
  removeQuestion: (questionIdx: number) => void;
  removeCheckItemFromQuestion: (
    questionIdx: number,
    checkItemIdx: number
  ) => void;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
}

export default function QuestionFormBuilder({
  form,
  setQuestionContent,
  setCheckItemContent,
  addEmptyQuestion,
  addCheckItemToQuestion,
  removeQuestion,
  removeCheckItemFromQuestion,
  changeQuestionInputType,
}: QuestionFormBuilderProps) {
  const addQuestionHandler = () => {
    addEmptyQuestion(form.length - 1, 'TEXT');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.questionContainer}>
        {form.map((question, idx) => {
          return (
            <Question
              key={idx}
              idx={idx}
              question={question}
              setQuestionContent={setQuestionContent}
              setCheckItemContent={setCheckItemContent}
              changeQuestionInputType={changeQuestionInputType}
              addCheckItemToQuestion={addCheckItemToQuestion}
              removeQuestion={removeQuestion}
              removeCheckItemFromQuestion={removeCheckItemFromQuestion}
            />
          );
        })}
      </div>
      <div className={styles.editConsole}>
        <IconButton
          aria-label='addQuestion'
          color='primary'
          onClick={() => addQuestionHandler()}
        >
          <AddBoxIcon fontSize='large' />
        </IconButton>
      </div>
    </div>
  );
}
