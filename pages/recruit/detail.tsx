import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import DynamicQuill from 'components/DynamicQuill';
import MyRecruitment from 'components/recruit/Main/MyRecruitment';
import StickyHeader from 'components/recruit/StickyHeader';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
import style from 'styles/recruit/Main/main.module.scss';
import 'react-quill/dist/quill.bubble.css';

function Recruit() {
  const router = useRouter();
  const recruitId = parseInt(router.query.recruitId as string);

  const { data, isLoading } = useRecruitDetail(recruitId);

  const onApply = () => {
    router.push(`/recruit/apply?recruitId=${recruitId}`);
  };

  // TODO : 구체화 필요함.
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (!data) {
    return <div>공고가 없습니다.</div>;
  }

  return (
    <>
      <StickyHeader headerTitle={data.title} />
      <DynamicQuill
        className={style.quillViewer}
        readOnly
        value={data.contents}
        theme='bubble'
      />
      <Button
        disabled={!!data.applicationId}
        size={'large'}
        variant='contained'
        color='primary'
        onClick={onApply}
      >
        지원하기
      </Button>
      <div className={style.divider} />
      <MyRecruitment applicationId={data.applicationId} />
    </>
  );
}

export default Recruit;
