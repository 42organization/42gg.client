import { Fragment } from 'react';
import { List } from '@mui/material';
import useInfiniteRecruitList from 'hooks/recruit/useInfiniteRecruitList';
import styles from 'styles/recruit/RecruitList/list.module.scss';
import RecruitListItem from './RecruitListItem';

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
    <>
      <List className={styles.list}>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.recruitments.map((recruit) => (
              <RecruitListItem key={recruit.id} recruit={recruit} />
            ))}
          </Fragment>
        ))}
      </List>
      <div ref={targetRef} />
    </>
  );
};

export default RecruitList;
