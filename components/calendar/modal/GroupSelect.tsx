import React from 'react';
import { CustomGroup } from 'types/calendar/customGroupType';
import { Schedule } from 'types/calendar/scheduleTypes';
import PlusSVG from 'public/image/calendar/plusIcon.svg';
import styles from 'styles/calendar/modal/GroupSelect.module.scss';
import ColorButton from '../button/ColorButton';

const groupList: CustomGroup[] = [
  {
    id: 1,
    title: '기본',
    backgroundColor: '#9C57BC',
  },
  {
    id: 2,
    title: '그룹2',
    backgroundColor: '#7DC163',
  },
  {
    id: 3,
    title: '그룹3',
    backgroundColor: '#E6634F',
  },
  {
    id: 4,
    title: '그룹4',
    backgroundColor: '#FFDD47',
  },
  {
    id: 5,
    title: '그룹5',
    backgroundColor: '#FFA646',
  },
  {
    id: 6,
    title: '그룹6',
    backgroundColor: '#357BE5',
  },
];

interface GroupSelectProps {
  isDropdown: boolean;
  setIsDropdown: (value: boolean) => void;
  schedule: Schedule;
  setSchedule: (value: Schedule) => void;
}

//백엔드에서 그룹 목록 get해오는 로직 필요
const GroupSelect = ({
  isDropdown,
  setIsDropdown,
  schedule,
  setSchedule,
}: GroupSelectProps) => {
  const handleGroupChange = (group: CustomGroup) => {
    schedule.groupId = group.id;
    schedule.groupTitle = group.title;
    schedule.groupColor = group.backgroundColor;
    setIsDropdown(false);
  };

  return (
    <div className={styles.dropdown}>
      {groupList.map((group) => (
        <div
          key={group.id}
          className={styles.groupItem}
          onClick={() => handleGroupChange(group)}
        >
          <div className={styles.groupItem}>
            <ColorButton
              color={group.backgroundColor}
              onClick={() => handleGroupChange(group)}
            />
            <div>{group.title}</div>
          </div>
        </div>
      ))}
      <div className={styles.groupItem}>
        <div
          className={styles.groupColor}
          style={{ backgroundColor: '#B4BDEE' }}
        >
          <PlusSVG width={12} height={12} stroke={'#ffffff'} />
        </div>
        <input
          type='text'
          name='grupTitle'
          placeholder='그룹 추가'
          className={styles.groupAddInput}
          onClick={(e) => {
            e.stopPropagation(); // 클릭 시 드롭다운 꺼지는거 방지
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // 그룹 추가 로직 필요
            }
          }}
        />
      </div>
    </div>
  );
};

export default GroupSelect;
