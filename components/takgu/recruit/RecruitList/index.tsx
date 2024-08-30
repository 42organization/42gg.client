import { Fragment } from 'react';
import { Button, List } from '@mui/material';
import useInfiniteRecruitList from 'hooks/takgu/recruit/useInfiniteRecruitList';
import styles from 'styles/takgu/recruit/RecruitList/list.module.scss';
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
      <Button size={'large'} variant={'contained'} color={'primary'} href='/'>
        42GG로 돌아가기
      </Button>
    </>
  );
};

export default RecruitList;
