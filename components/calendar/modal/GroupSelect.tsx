import React from 'react';
import { CustomGroup } from 'types/calendar/customGroupType';
import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/modal/GroupSelect.module.scss';

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
            <div
              className={styles.groupColor}
              style={{ backgroundColor: group.backgroundColor }}
            />
            <div>{group.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupSelect;
