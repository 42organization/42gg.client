import { Iquestion } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

function TextInput() {
  return <div>TextInput</div>;
}

function CheckBoxInput() {
  return <div>CheckBoxInput</div>;
}

function RadioInput() {
  return <div>RadioButtonInput</div>;
}

interface QuestionProps {
  key: number;
  question: Iquestion;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
}

function Question({ key, question, changeQuestionInputType }: QuestionProps) {
  const selectChangehandler = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    changeQuestionInputType(key, target.value);
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionWrapper}>
        <input type='text' placeholder='질문' />
        <select
          name='type'
          value={question.inputType}
          onChange={selectChangehandler}
        >
          <option value='TEXT'>TEXT</option>
          <option value='SINGLE_CHECK'>SINGLE_CHECK</option>
          <option value='MULTI_CHECK'>MULTI_CHECK</option>
        </select>
      </div>
      <div>
        {question.inputType === 'TEXT' && <TextInput />}
        {question.inputType === 'SINGLE_CHECK' && <CheckBoxInput />}
        {question.inputType === 'MULTI_CHECK' && <RadioInput />}
      </div>
    </div>
  );
}

interface QuestionFormBuilderProps {
  form: Iquestion[];
  addEmptyQuestion: (questionIdx: number, inputType: string) => void;
  addCheckItemToQuestion: (questionIdx: number) => void;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
}

export default function QuestionFormBuilder({
  form,
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
              question={question}
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
