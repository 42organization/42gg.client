import { useRouter } from 'next/router';
import { List } from '@mui/material';
import useGetRecruitResult from 'hooks/recruit/useGetRecruitResult';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import textStyle from 'styles/recruit/text.module.scss';
import CollapseListItem from './CollapseListItem';
import MyApplicationInfo from './MyApplicationInfo';
import MyRecruitStatus from './MyRecruitStatus';

const MyRecruitment = ({ applicationId }: { applicationId?: number }) => {
  const router = useRouter();
  const { data } = useGetRecruitResult(
    router.query.id as string,
    applicationId
  );
  const { status, interviewDate } = data || {}; // TODO : 에러가 난 경우 적절한 처리 필요함.
  return (
    <div className={style.container}>
      <span className={textStyle.pageSubTitle}>나의 지원현황</span>
      <List className={style.listContainer}>
        <CollapseListItem title={'지원서 정보'}>
          <MyApplicationInfo
            status={status}
            recruitId={router.query.id as string}
          />
        </CollapseListItem>
        <CollapseListItem title={'지원 현황'}>
          <MyRecruitStatus status={status} interviewDate={interviewDate} />
        </CollapseListItem>
      </List>
    </div>
  );
};

export default MyRecruitment;
