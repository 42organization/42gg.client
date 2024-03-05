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
  inputType: 'TEXT' | 'CHECKBOX' | 'RADIO';
}

function Question({ inputType }: QuestionProps) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionWrapper}>
        <input type='text' placeholder='질문' />
        <select
          name='type'
          value='CUSTOM'
          // onChange={selectChangehandler}
        >
          <option value='TEXT'>TEXT</option>
          <option value='CHECKBOX'>CHECKBOX</option>
          <option value='RADIO'>RADIO</option>
        </select>
      </div>
      <div>
        {inputType === 'TEXT' && <TextInput />}
        {inputType === 'CHECKBOX' && <CheckBoxInput />}
        {inputType === 'RADIO' && <RadioInput />}
      </div>
    </div>
  );
}

export default function QuestionFormBuilder() {
  return (
    <>
      <div className={styles.mainContainer}>
        <Question inputType='TEXT' />
      </div>
      <div className={styles.editConsole}>
        <button>질문지 항목 추가하기</button>
      </div>
    </>
  );
}
