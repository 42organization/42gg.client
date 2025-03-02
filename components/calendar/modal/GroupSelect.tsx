import React, { useState, useContext } from 'react';
import { ScheduleGroup, groupColorTypes } from 'types/calendar/groupType';
import { Schedule } from 'types/calendar/scheduleTypes';
import ColorButton from 'components/calendar/button/ColorButton';
import PlusSVG from 'public/image/calendar/plusIcon.svg';
import useScheduleGroupRequest from 'hooks/calendar/useScheduleGroupRequest';
import styles from 'styles/calendar/modal/GroupSelect.module.scss';
import { useGroup } from '../GroupContext';

interface GroupSelectProps {
  isDropdown: boolean;
  setIsDropdown: (value: boolean) => void;
  schedule: Schedule;
  setSchedule?: (value: Schedule) => void;
  importSchedule?: (groupId: number) => void;
}

//백엔드에서 그룹 목록 get해오는 로직 필요
const GroupSelect = ({
  isDropdown,
  setIsDropdown,
  schedule,
  setSchedule,
  importSchedule,
}: GroupSelectProps) => {
  const { groupList } = useGroup();
  const { sendGroupRequest } = useScheduleGroupRequest();
  const [newGroupTitle, setNewGroupTitle] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleGroupChange = (group: ScheduleGroup) => {
    if (setSchedule) {
      setSchedule({
        ...schedule,
        groupId: group.id!,
        // groupTitle: group.title,
        // groupColor: group.backgroundColor,
      });
    } else if (importSchedule) {
      importSchedule(group.id!);
    }
    setIsDropdown(false);
  };

  const getRandomGroupColor = () => {
    const colors = Object.values(groupColorTypes); // 색상 값만 배열로 변환
    const randomIndex = Math.floor(Math.random() * colors.length); // 랜덤 인덱스 생성
    return colors[randomIndex]; // 랜덤 색상 반환
  };

  const addGroup = async () => {
    const newGroup: ScheduleGroup = {
      title: newGroupTitle,
      backgroundColor: getRandomGroupColor(),
      id: 0,
    };
    await sendGroupRequest('POST', 'custom', newGroup, () => {
      setNewGroupTitle('');
    });
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
          name='groupTitle'
          placeholder='그룹 추가'
          value={newGroupTitle}
          className={styles.groupAddInput}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setNewGroupTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (isComposing) {
                return;
              }
              e.preventDefault();
              addGroup();
            }
          }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      </div>
    </div>
  );
};

export default GroupSelect;
