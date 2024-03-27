import React from 'react';
import { CheckBox } from '@mui/icons-material';
import { Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { IcheckItem, Iquestion } from 'types/admin/adminRecruitmentsTypes';
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
            </Grid>
          );
        })}
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
            </Grid>
          );
        })}
    </RadioGroup>
  );
}

interface QuestionProps {
  idx: number;
  question: Iquestion;
}

function Question({ idx, question }: QuestionProps) {
  return (
    <Paper
      elevation={3}
      className={`${styles.questionWrapper}`}
      style={{ marginBottom: '1rem' }}
    >
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
