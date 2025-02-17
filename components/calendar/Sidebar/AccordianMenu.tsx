import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import CloseSVG from 'public/image/calendar/closeIcon.svg';
import DownSVG from 'public/image/calendar/downToggle.svg';
import EditSVG from 'public/image/calendar/editIcon.svg';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import GroupColorSelect from '../modal/GroupColorSelect';

const groupList = [
  { id: 1, title: 'group1', color: '#7DC163' },
  { id: 2, title: 'group2', color: '#E99A45' },
];

//체크박스로 그룹/일정 필터링 기능 추가 필요
//그룹 수정 모드에서 추가해야 할 기능
// 1. 그룹 이름 수정 기능(현재 입력 안됨)
// 2. 엔터키 눌렀을 때 그룹 이름 변경사항 저장
// 3. 색깔 변경 기능
// 4. x 버튼으로 삭제 기능
// 5. 색깔 변경 드롭다운 외부 눌렀을때 드롭다운 꺼지게 하기
const AccordianMenu = () => {
  const [isOpenPublicSchedule, setIsOpenPublicSchedule] = useState(true);
  const [isOpenPrivateSchedule, setIsOpenPrivateSchedule] = useState(true);
  const [selectedPublicScheduleTags, setSelectedPublicScheduleTags] = useState<
    string[]
  >([]);
  const [selectedPrivateScheduleTags, setSelectedPrivateScheduleTags] =
    useState<string[]>([]);
  const [isGroupEdit, setIsGroupEdit] = useState(false); // 그룹 수정 모드
  const [editingGroups, setEditingGroups] = useState(groupList);
  const [openDropdownId, setOpenDropdownId] = useState<number>(0);

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

  const handleGroupTitleChange = (id: number, value: string) => {
    setEditingGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, title: value } : group
      )
    );
  };

  const handleGroupSave = (id: number) => {
    setIsGroupEdit(false);
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
                margin: 0,
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
        {isOpenPrivateSchedule && (
          <EditSVG
            stroke='#C1C8F0'
            width={16}
            height={17}
            onClick={() => setIsGroupEdit((prev) => !prev)}
          />
        )}
      </div>
      {isOpenPrivateSchedule && (
        <div className={styles.accordianContent}>
          {groupList.map((group) => (
            <div key={group.id} className={styles.groupInfo}>
              <FormControlLabel
                control={
                  isGroupEdit ? (
                    <Checkbox
                      size='small'
                      checked={true}
                      onChange={(event) => event.preventDefault()}
                      onClick={() => setOpenDropdownId(group.id)}
                      sx={{
                        color: group.color,
                        '&.Mui-checked': { color: group.color },
                      }}
                    />
                  ) : (
                    <Checkbox
                      size='small'
                      defaultChecked
                      onChange={() =>
                        handlePrivateScheduleTagChange(group.title)
                      }
                      sx={{
                        color: group.color,
                        '&.Mui-checked': { color: group.color },
                      }}
                    />
                  )
                }
                label={
                  isGroupEdit ? (
                    <input
                      type='text'
                      value={group.title}
                      onChange={(e) =>
                        handleGroupTitleChange(group.id, e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' && setIsGroupEdit(false)
                      }
                      className={styles.groupField}
                    />
                  ) : (
                    <>{group.title}</>
                  )
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: group.color,
                    fontSize: '14px',
                    margin: 0,
                  },
                }}
              />
              {openDropdownId === group.id && (
                <GroupColorSelect
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                />
              )}
              {isGroupEdit && (
                <CloseSVG
                  width={13}
                  height={13}
                  color={'#000'}
                  onClick={() => handleGroupSave(group.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordianMenu;
