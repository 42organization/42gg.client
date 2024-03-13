import { List } from '@mui/material';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import textStyle from 'styles/recruit/text.module.scss';
import CollapseListItem from './CollapseListItem';

const MyRecruitment = () => {
  return (
    <div className={style.container}>
      <span className={textStyle.pageSubTitle}>나의 지원현황</span>
      <List className={style.listContainer}>
        <CollapseListItem title={'지원서 정보'}>
          <div className={style.collapseContainer}>지원서 정보</div>
        </CollapseListItem>
        <CollapseListItem title={'지원 현황'}>
          <div className={style.collapseContainer}>지원현황</div>
        </CollapseListItem>
      </List>
    </div>
  );
};

export default MyRecruitment;
