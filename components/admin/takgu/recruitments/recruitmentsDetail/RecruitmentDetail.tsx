import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import {
  Iquestion,
  Irecruit,
  RecruitmentDetailProps,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/takgu/recruitments/recruitmentDetail/RecruitmentDetail.module.scss';
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
    forms: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitmentInfo = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`admin/recruitments/${recruit.id}`);
      const data: Irecruit = {
        id: recruit.id,
        isFinish: recruit.isFinish,
        title: res.data.title,
        startDate: new Date(res.data.startDate),
        endDate: new Date(res.data.endDate),
        generation: res.data.generation,
        contents: res.data.contents,
        forms: res.data.forms,
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
      <IconButton
        aria-label='메인으로 가기'
        onClick={() => {
          setPage({ pageType: 'MAIN', props: null });
        }}
      >
        <HomeIcon />
      </IconButton>
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
          <QuestionForm form={recruitmentInfo.forms as Iquestion[]} />
        </>
      )}
    </div>
  );
}
