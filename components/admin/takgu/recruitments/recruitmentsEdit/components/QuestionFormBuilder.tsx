import React, { useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
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
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  IcheckItem,
  Iquestion,
} from 'types/admin/takgu/adminRecruitmentsTypes';
import DraggableList from 'components/takgu/UI/DraggableList';
import { IFormManager } from 'hooks/takgu/recruitments/useRecruitmentEditInfo';
import styles from 'styles/admin/takgu/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

interface CheckInputProps {
  checkList: IcheckItem[] | undefined;
  questionIdx: number;
  formManager: IFormManager;
}

function MultiCheckInput({
  checkList,
  questionIdx,
  formManager,
}: CheckInputProps) {
  const inputChangeHandler = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    formManager.setCheckItemContent(questionIdx, idx, target.value);
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
                  value={checkItem.contents}
                  size='small'
                  variant='standard'
                  onChange={(e) => inputChangeHandler(e, idx)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label='delete'
                  onClick={() =>
                    formManager.removeCheckItemFromQuestion(idx, questionIdx)
                  }
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton
        aria-label='addCheckItem'
        onClick={() => formManager.addCheckItemToQuestion(questionIdx)}
        style={{ width: '100%' }}
      >
        <AddIcon />
      </IconButton>
    </>
  );
}

function SingleCheckInput({
  checkList,
  questionIdx,
  formManager,
}: CheckInputProps) {
  const inputChangeHandler = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    formManager.setCheckItemContent(questionIdx, idx, target.value);
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
                  value={checkItem.contents}
                  size='small'
                  variant='standard'
                  onChange={(e) => inputChangeHandler(e, idx)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label='delete'
                  onClick={() =>
                    formManager.removeCheckItemFromQuestion(idx, questionIdx)
                  }
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      <IconButton
        aria-label='addCheckItem'
        onClick={() => formManager.addCheckItemToQuestion(questionIdx)}
      >
        <AddIcon />
      </IconButton>
    </RadioGroup>
  );
}

interface QuestionProps {
  idx: number;
  question: Iquestion;
  formManager: IFormManager;
  isFocused: boolean;
  setFocusedQuestion: React.Dispatch<React.SetStateAction<number | null>>;
}

function Question({
  idx,
  question,
  formManager,
  isFocused,
  setFocusedQuestion,
}: QuestionProps) {
  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    formManager.changeQuestionInputType(idx, target.value);
  };

  const inputChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formManager.setQuestionContent(idx, target.value);
  };

  return (
    <Paper
      elevation={3}
      className={`${styles.questionWrapper} ${isFocused ? styles.focused : ''}`}
      onClick={() => setFocusedQuestion(idx)}
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
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth size='small'>
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
              formManager={formManager}
            />
          )}
          {question.inputType === 'MULTI_CHECK' && (
            <MultiCheckInput
              questionIdx={idx}
              checkList={question.checkList}
              formManager={formManager}
            />
          )}
        </Grid>
        <IconButton
          aria-label='delete'
          onClick={() => formManager.removeQuestion(idx)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
}

interface QuestionFormBuilderProps {
  form: Iquestion[];
  formManager: IFormManager;
}

export default function QuestionFormBuilder({
  form,
  formManager,
}: QuestionFormBuilderProps) {
  const [focusedQuestionIdx, setFocusedQuestion] = React.useState<
    number | null
  >(null);

  const questionRef = useRef<Array<HTMLDivElement | null>>([]);

  const addQuestionHandler = () => {
    if (focusedQuestionIdx === null) setFocusedQuestion(form.length - 1);

    formManager.addEmptyQuestion(focusedQuestionIdx as number, 'TEXT');
    setFocusedQuestion((focusedQuestionIdx as number) + 1);
    questionRef.current[(focusedQuestionIdx as number) - 1]?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const onDragEndHandler = ({ destination, source }: DropResult) => {
    if (!destination) return;
    formManager.switchQuestionIndex(source.index, destination.index);
    setFocusedQuestion(destination.index);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.questionContainer}>
        <DraggableList onDragEnd={onDragEndHandler}>
          {form &&
            form.map((question, idx) => {
              return (
                <>
                  <Question
                    key={idx}
                    idx={idx}
                    question={question}
                    formManager={formManager}
                    isFocused={focusedQuestionIdx === idx}
                    setFocusedQuestion={setFocusedQuestion}
                  />
                  <div ref={(el) => (questionRef.current[idx] = el)}></div>
                </>
              );
            })}
        </DraggableList>
        <div className={styles.editConsole}>
          <Tooltip title='질문추가'>
            <IconButton
              aria-label='addQuestion'
              color='primary'
              onClick={() => addQuestionHandler()}
            >
              <AddBoxIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
