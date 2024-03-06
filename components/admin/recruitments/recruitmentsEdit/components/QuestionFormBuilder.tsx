import { Iquestion } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuestionFormBuilder.module.scss';

function TextInput() {
  return <div>TextInput</div>;
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
  const selectChangehandler = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    changeQuestionInputType(idx, target.value);
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
        {question.inputType === 'SINGLE_CHECK' && <SingleCheckInput />}
        {question.inputType === 'MULTI_CHECK' && <MultiCheckInput />}
      </div>
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
