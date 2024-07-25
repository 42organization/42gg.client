import React from 'react';
import { CheckBox } from '@mui/icons-material';
import { Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { IcheckItem, Iquestion } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/takgu/recruitments/recruitmentDetail/components/QuestionForm.module.scss';

interface CheckInputProps {
  checkList: IcheckItem[] | undefined;
}

function MultiCheckInput({ checkList }: CheckInputProps) {
  return (
    <>
      {checkList &&
        checkList.map((checkItem, idx) => {
          return (
            <Grid container key={idx} style={{ marginBottom: '0.2rem' }}>
              <Grid item xs={1} alignItems='center'>
                <CheckBox />
              </Grid>
              <Grid item xs={10} alignContent={'center'}>
                <div>{checkItem.contents}</div>
              </Grid>
            </Grid>
          );
        })}
    </>
  );
}

function SingleCheckInput({ checkList }: CheckInputProps) {
  return (
    <RadioGroup>
      {checkList &&
        checkList.map((checkItem, idx) => {
          return (
            <Grid container key={idx} style={{ marginBottom: '0.2rem' }}>
              <Grid item xs={1}>
                <Radio value={idx} />
              </Grid>
              <Grid item xs={10} alignContent={'center'}>
                <div>{checkItem.contents}</div>
                {/* <TextField
                  fullWidth
                  required
                  label='직접입력'
                  value={checkItem.content}
                  size='small'
                  variant='standard'
                /> */}
              </Grid>
            </Grid>
          );
        })}
    </RadioGroup>
  );
}

interface QuestionProps {
  question: Iquestion;
}

function Question({ question }: QuestionProps) {
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
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          {question.inputType === 'SINGLE_CHECK' && (
            <SingleCheckInput checkList={question.checkList} />
          )}
          {question.inputType === 'MULTI_CHECK' && (
            <MultiCheckInput checkList={question.checkList} />
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
            return <Question key={idx} question={question} />;
          })}
      </div>
    </div>
  );
}
