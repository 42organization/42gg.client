import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { CheckBox } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import { IcheckItem, Iquestion } from 'types/admin/adminRecruitmentsTypes';
import DraggableList from 'components/UI/DraggableList';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

interface CheckInputProps {
  checkList: IcheckItem[] | undefined;
  questionIdx: number;
}

function MultiCheckInput({ checkList, questionIdx }: CheckInputProps) {
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
                  value={checkItem.contents}
                  size='small'
                  variant='standard'
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label='delete'>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton aria-label='addCheckItem' style={{ width: '100%' }}>
        <AddIcon />
      </IconButton>
    </>
  );
}

function SingleCheckInput({ checkList, questionIdx }: CheckInputProps) {
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
                  value={checkItem.contents}
                  size='small'
                  variant='standard'
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label='delete'>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton aria-label='addCheckItem'>
        <AddIcon />
      </IconButton>
    </RadioGroup>
  );
}

interface QuestionProps {
  idx: number;
  question: Iquestion;
}

function Question({ idx, question }: QuestionProps) {
  return (
    <Paper elevation={3} className={`${styles.questionWrapper}`}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            required
            name='question'
            label='질문'
            fullWidth
            value={question.question}
            size='small'
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth size='small'>
            <InputLabel>질문 유형</InputLabel>
            <Select value={question.inputType} label='질문 유형'>
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
            />
          )}
          {question.inputType === 'MULTI_CHECK' && (
            <MultiCheckInput questionIdx={idx} checkList={question.checkList} />
          )}
        </Grid>
        <IconButton aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
}

interface QuestionFormProps {
  form: Iquestion[];
}

export default function QuestionForm({ form }: QuestionFormProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.questionContainer}>
        {form &&
          form.map((question, idx) => {
            return <Question key={idx} idx={idx} question={question} />;
          })}
      </div>
    </div>
  );
}
