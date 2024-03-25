import {
  RecruitmentDetailProps,
  RecruitmentsMainProps,
} from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/RecruitmentEdit.module.scss';
import ActionSelectorButtons from '../recruitmentsEdit/components/ActionSelectorButtons';
import QuestionFormBuilder from '../recruitmentsEdit/components/QuestionFormBuilder';
import QuillDescriptionEditor from '../recruitmentsEdit/components/QuillDescriptionEditor';
import TitleTimeRangeSelector from '../recruitmentsEdit/components/TitleTimeRangeSelector';

export default function RecruitmentDetail({
  setPage,
  recruit,
}: RecruitmentDetailProps) {
  console.log(recruit.id);
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          const props = { setPage: setPage } as RecruitmentsMainProps;
          setPage({ pageType: 'MAIN', props: props });
        }}
      >
        홈으로 돌아가기
      </button>

      {/* <TitleTimeRangeSelector
        recruitmentEditInfo={recruitmentEditInfo}
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuillDescriptionEditor
        contents={recruitmentEditInfo.contents}
        setRecruitmentEditInfoField={setRecruitmentEditInfoField}
      />
      <QuestionFormBuilder
        form={recruitmentEditInfo.form}
        formManager={formManager}
      />
      <ActionSelectorButtons
        recruitmentEditInfo={recruitmentEditInfo}
        importRecruitmentInfo={importRecruitmentInfo}
        actionType='CREATE'
      /> */}
    </div>
  );
}
