import { Dispatch, SetStateAction } from 'react';
import { IrecruitEditInfo } from 'types/admin/adminRecruitmentsTypes';
import useRecruitmentEditInfo from 'hooks/recruitments/useRecruitmentEditInfo';
import styles from 'styles/admin/recruitments/recruitmentEdit/RecruitmentEdit.module.scss';
import ActionSelectorButtons from './components/ActionSelectorButtons';
import QuestionFormBuilder from './components/QuestionFormBuilder';
import QuillDescriptionEditor from './components/QuillDescriptionEditor';
import TitleTimeRangeSelector from './components/TitleTimeRangeSelector';

const initRecruitmentEditInfo: IrecruitEditInfo = {
  title: '',
  startDate: '',
  endDate: '',
  generation: '',
  content: '',
  form: [],
};

interface RecruitmentEditProps {
  setPageType: Dispatch<SetStateAction<'MAIN' | 'EDIT'>>;
}
export default function RecruitmentEdit({ setPageType }: RecruitmentEditProps) {
  const {
    recruitmentEditInfo,
    setTitle,
    setStartDate,
    setEndDate,
    setGeneration,
    setContent,
    setQuestionContent,
    setCheckItemContent,
    addEmptyQuestion,
    addCheckItemToQuestion,
    removeQuestion,
    removeCheckItemFromQuestion,
    changeQuestionInputType,
    switchQuestionIndex,
  } = useRecruitmentEditInfo(initRecruitmentEditInfo);

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          setPageType('MAIN');
        }}
      >
        메인으로가기
      </button>
      <TitleTimeRangeSelector
        recruitmentEditInfo={recruitmentEditInfo}
        setTitle={setTitle}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setGeneration={setGeneration}
      />
      <QuillDescriptionEditor
        content={recruitmentEditInfo.content}
        setContent={setContent}
      />
      <QuestionFormBuilder
        form={recruitmentEditInfo.form}
        setQuestionContent={setQuestionContent}
        setCheckItemContent={setCheckItemContent}
        addEmptyQuestion={addEmptyQuestion}
        addCheckItemToQuestion={addCheckItemToQuestion}
        removeQuestion={removeQuestion}
        removeCheckItemFromQuestion={removeCheckItemFromQuestion}
        changeQuestionInputType={changeQuestionInputType}
        switchQuestionIndex={switchQuestionIndex}
      />
      <ActionSelectorButtons
        recruitmentEditInfo={recruitmentEditInfo}
        actionType='CREATE'
      />
    </div>
  );
}
