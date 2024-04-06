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
  const { recruitmentEditInfo, setRecruitmentEditInfoField, formManager } =
    useRecruitmentEditInfo(initRecruitmentEditInfo);

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
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuillDescriptionEditor
        content={recruitmentEditInfo.content}
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuestionFormBuilder
        form={recruitmentEditInfo.form}
        formManager={formManager}
      />
      <ActionSelectorButtons
        recruitmentEditInfo={recruitmentEditInfo}
        actionType='CREATE'
      />
    </div>
  );
}
