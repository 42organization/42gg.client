import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ScheduleGroup, groupColorTypes } from 'types/calendar/groupType';
import { Schedule } from 'types/calendar/scheduleTypes';
import { toastState } from 'utils/recoil/toast';
import ColorButton from 'components/calendar/button/ColorButton';
import { useGroup } from 'components/calendar/GroupContext';
import PlusSVG from 'public/image/calendar/plusIcon.svg';
import useScheduleGroupRequest from 'hooks/calendar/useScheduleGroupRequest';
import styles from 'styles/calendar/modal/GroupSelect.module.scss';

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
  const setSnackbar = useSetRecoilState(toastState);

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
    await sendGroupRequest(
      'POST',
      'custom',
      newGroup,
      () => {
        setNewGroupTitle('');
      },
      (error: string) => {
        let errMsg;
        if (newGroup.title === '') {
          errMsg = '그룹 이름을 입력해주세요.';
        } else if (newGroup.title.length > 50) {
          errMsg = '그룹 이름은 50자 이내로 입력해주세요.';
        } else if (
          Object.values(groupColorTypes).includes(newGroup.backgroundColor)
        ) {
          errMsg = '유효한 색깔이 아닙니다.';
        }
        setSnackbar({
          toastName: 'post error',
          severity: 'error',
          message: `🔥 ${errMsg} 🔥`,
          clicked: true,
        });
      }
    );
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
            <ColorButton color={group.backgroundColor} />
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
