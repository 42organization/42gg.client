import { Fragment } from 'react';
import useInfiniteRecruitList from 'hooks/recruit/useInfiniteRecruitList';

const RecruitList = () => {
  const { data, isLoading, isError, targetRef } = useInfiniteRecruitList();

  // TODO : 구체화 필요함.
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || !data) {
    return <div>에러 발생</div>;
  }

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.recruitments.map((recruit) => (
            <div key={recruit.id}>{recruit.title}</div>
          ))}
        </Fragment>
      ))}
      <div ref={targetRef} />
    </div>
  );
};

export default RecruitList;
