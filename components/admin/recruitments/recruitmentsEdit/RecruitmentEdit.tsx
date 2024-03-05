import { Dispatch, SetStateAction } from 'react';
import styles from 'styles/admin/recruitments/recruitmentEdit/RecruitmentEdit.module.scss';
import ActionSelectorButtons from './components/ActionSelectorButtons';
import QuestionFormBuilder from './components/QuestionFormBuilder';
import QuillDescriptionEditor from './components/QuillDescriptionEditor';
import TitleTimeRangeSelector from './components/TitleTimeRangeSelector';
import RecruitmentsMain from '../RecruitmentsMain';

interface RecruitmentEditProps {
  setPage: Dispatch<SetStateAction<JSX.Element>>;
}
export default function RecruitmentEdit({ setPage }: RecruitmentEditProps) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          setPage(<RecruitmentsMain setPage={setPage} />);
        }}
      >
        메인으로가기
      </button>
      <TitleTimeRangeSelector />
      <QuillDescriptionEditor />
      <QuestionFormBuilder />
      <ActionSelectorButtons />
    </div>
  );
}
