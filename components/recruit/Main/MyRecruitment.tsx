import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

const MyRecruitment = () => {
  const [openApplicationInfo, setOpenApplicationInfo] = useState(false);
  const [openRecruitmentStatus, setOpenRecruitmentStatus] = useState(false);

  return (
    <div className={style.container}>
      <span className={textStyle.pageSubTitle}>나의 지원현황</span>
      <List className={style.listContainer}>
        <ListItemButton
          className={style.listButton}
          onClick={() => setOpenApplicationInfo((prev) => !prev)}
        >
          <ArrowIcon open={openApplicationInfo} />
          <ListItemText
            primaryTypographyProps={{ className: style.listButtonText }}
            primary='지원서 정보'
          />
        </ListItemButton>
        {/* TODO : Collapse 옵션 좀 더 찾아볼것 */}
        <Collapse in={openApplicationInfo}>
          <div className={style.collapseContainer}>지원서 정보</div>
        </Collapse>
        <ListItemButton
          className={style.listButton}
          onClick={() => setOpenRecruitmentStatus((prev) => !prev)}
        >
          <ArrowIcon open={openRecruitmentStatus} />
          <ListItemText
            primaryTypographyProps={{ className: style.listButtonText }}
            primary='지원현황'
          />
        </ListItemButton>
        <Collapse in={openRecruitmentStatus}>
          <div className={style.collapseContainer}>지원현황</div>
        </Collapse>
      </List>
    </div>
  );
};

const ArrowIcon = ({ open }: { open: boolean }) => {
  return (
    <KeyboardArrowDown
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  );
};

export default MyRecruitment;
