import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import {
  Iquestion,
  Irecruit,
  RecruitmentEditProps,
} from 'types/admin/adminRecruitmentsTypes';
import useRecruitmentEditInfo from 'hooks/recruitments/useRecruitmentEditInfo';
import styles from 'styles/admin/recruitments/recruitmentEdit/RecruitmentEdit.module.scss';
import ActionSelectorButtons from './components/ActionSelectorButtons';
import QuestionFormBuilder from './components/QuestionFormBuilder';
import QuillDescriptionEditor from './components/QuillDescriptionEditor';
import TitleTimeRangeSelector from './components/TitleTimeRangeSelector';

const emptyRecruitmentEditInfo: Irecruit = {
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  generation: '',
  contents: '',
  form: [],
};

export default function RecruitmentEdit({
  setPage,
  recruitmentInfo,
  mode,
}: RecruitmentEditProps) {
  const initRecruitmentEditInfo = recruitmentInfo
    ? recruitmentInfo
    : emptyRecruitmentEditInfo;

  const {
    recruitmentEditInfo,
    setRecruitmentEditInfoField,
    formManager,
    importRecruitmentInfo,
  } = useRecruitmentEditInfo(initRecruitmentEditInfo);

  return (
    <div className={styles.container}>
      <IconButton
        aria-label='메인으로 가기'
        onClick={() => {
          setPage({ pageType: 'MAIN', props: null });
        }}
      >
        <HomeIcon />
      </IconButton>
      <TitleTimeRangeSelector
        recruitmentEditInfo={recruitmentEditInfo}
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuillDescriptionEditor
        contents={recruitmentEditInfo.contents as string}
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuestionFormBuilder
        form={recruitmentEditInfo.form as Iquestion[]}
        formManager={formManager}
      />
      <ActionSelectorButtons
        recruitmentEditInfo={recruitmentEditInfo}
        importRecruitmentInfo={importRecruitmentInfo}
        actionType={mode}
      />
    </div>
  );
}
