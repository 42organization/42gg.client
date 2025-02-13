import Image from 'next/image';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Schedule } from 'types/calendar/scheduleTypes';
import DownSVG from 'public/image/calendar/downToggle.svg';
import EditSVG from 'public/image/calendar/editIcon.svg';
import styles from 'styles/calendar/CalendarSidebar.module.scss';

const groupList = [
  { id: 1, title: 'group1', color: '#7DC163' },
  { id: 2, title: 'group2', color: '#E99A45' },
];

const AccordianMenu = () => {
  const [isOpenPublicSchedule, setIsOpenPublicSchedule] = useState(true);
  const [isOpenPrivateSchedule, setIsOpenPrivateSchedule] = useState(true);
  const [selectedPublicScheduleTags, setSelectedPublicScheduleTags] = useState<
    string[]
  >([]);
  const [selectedPrivateScheduleTags, setSelectedPrivateScheduleTags] =
    useState<string[]>([]);

  const handleClickPublicSchedule = () => {
    setIsOpenPublicSchedule(!isOpenPublicSchedule);
  };
  const handleClickPrivateSchedule = () => {
    setIsOpenPrivateSchedule(!isOpenPrivateSchedule);
  };

  const handlePublicScheduleTagChange = (tag: string) => {
    setSelectedPublicScheduleTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }
      return [...prev, tag];
    });
  };

  const handlePrivateScheduleTagChange = (tag: string) => {
    setSelectedPrivateScheduleTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }
      return [...prev, tag];
    });
  };

  return (
    <div>
      <div className={styles.accordianMenu}>
        <DownSVG
          width={20}
          height={20}
          fill='#B4BDEE'
          onClick={handleClickPublicSchedule}
        />
        <p>전체일정</p>
      </div>
      {isOpenPublicSchedule && (
        <div className={styles.accordianContent}>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                defaultChecked
                onChange={() => handlePublicScheduleTagChange('EVENT')}
                sx={{ color: '#785AD2', '&.Mui-checked': { color: '#785AD2' } }}
              />
            }
            label='42행사'
            sx={{
              '& .MuiFormControlLabel-label': {
                color: '#785AD2',
                fontSize: '14px',
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                defaultChecked
                onChange={() => handlePublicScheduleTagChange('JOB_NOTICE')}
                sx={{ color: '#A98CFF', '&.Mui-checked': { color: '#A98CFF' } }}
              />
            }
            label='취업공고'
            sx={{
              '& .MuiFormControlLabel-label': {
                color: '#A98CFF',
                fontSize: '14px',
              },
            }}
          />
        </div>
      )}
      <div className={styles.divider} />
      <div className={styles.accordianMenu}>
        <DownSVG
          width={20}
          height={20}
          fill='#B4BDEE'
          onClick={handleClickPrivateSchedule}
        />
        <p>개인일정</p>
        <EditSVG stroke='#C1C8F0' width={16} height={17} />
      </div>
      {isOpenPrivateSchedule && (
        <div className={styles.accordianContent}>
          {groupList.map((group) => (
            <FormControlLabel
              key={group.id}
              control={
                <Checkbox
                  size='small'
                  defaultChecked
                  onChange={() => handlePrivateScheduleTagChange(group.title)}
                  sx={{
                    color: group.color,
                    '&.Mui-checked': { color: group.color },
                  }}
                />
              }
              label={group.title}
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: group.color,
                  fontSize: '14px',
                },
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordianMenu;
