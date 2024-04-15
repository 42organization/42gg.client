import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Iquestion,
  Irecruit,
  RecruitmentDetailProps,
  RecruitmentsMainProps,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/recruitments/recruitmentDetail/RecruitmentDetail.module.scss';
import ActionSelectorButtons from './components/ActionSelectorButtons';
import QuestionForm from './components/QuestionForm';
import QuillDescriptionViewer from './components/QuillDescriptionViewer';
import TitleTimeRange from './components/TitleTimeRange';

export default function RecruitmentDetail({
  setPage,
  recruit,
}: RecruitmentDetailProps) {
  const [recruitmentInfo, setRecruitmentInfo] = useState<Irecruit>({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    generation: '',
    contents: '',
    form: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitmentInfo = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get('/recruitments/' + recruit.id);
      const data: Irecruit = {
        id: recruit.id,
        status: recruit.status,
        title: res.data.title,
        startDate: new Date(res.data.startDate),
        endDate: new Date(res.data.endDate),
        generation: res.data.generation,
        contents: res.data.contents,
        form: res.data.form,
      };
      setRecruitmentInfo(data);
      setIsLoading(false);
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
    getRecruitmentInfo();
  }, []);

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
      {isLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <ActionSelectorButtons
            recruitmentInfo={recruitmentInfo as Irecruit}
            actionType='CREATE'
            setPage={setPage}
          ></ActionSelectorButtons>
          <TitleTimeRange recruitmentInfo={recruitmentInfo as Irecruit} />
          <QuillDescriptionViewer
            contents={recruitmentInfo.contents as string}
          />
          <QuestionForm form={recruitmentInfo.form as Iquestion[]} />
        </>
      )}
    </div>
  );
}
