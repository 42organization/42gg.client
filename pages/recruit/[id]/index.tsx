import { useRouter } from 'next/router';
import StickyHeader from 'components/recruit/StickyHeader';
import useRecruitDetail from 'hooks/recruit/useRecruitDetail';
// import style from 'styles/recruit/Main/main.module.scss';

function Recruit() {
  const router = useRouter();
  const { data, isLoading } = useRecruitDetail({
    id: parseInt(router.query.id as string),
  });

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
    </>
  );
}

export default Recruit;
