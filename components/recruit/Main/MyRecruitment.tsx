import { useRouter } from 'next/router';
import { List } from '@mui/material';
import CollapseListItem from 'components/recruit/Main/CollapseListItem';
import MyApplicationInfo from 'components/recruit/Main/MyApplicationInfo';
import MyRecruitStatus from 'components/recruit/Main/MyRecruitStatus';
import useGetRecruitResult from 'hooks/recruit/useGetRecruitResult';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

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
            recruitId={router.query.recruitId as string}
            applicationId={applicationId}
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
