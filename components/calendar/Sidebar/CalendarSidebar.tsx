import React from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import AccordianItem from './AccordianItem';

interface CalendarSidebarProps {
  sidebarOpen: boolean;
  publicGroups: ScheduleGroup[];
  privateGroups: ScheduleGroup[];
  filter: ScheduleFilter;
  filterChange: (type: 'public' | 'private', id: string | number) => void;
}

//프로필 부분 작업 필요
const CalendarSidebar = ({
  sidebarOpen,
  publicGroups,
  privateGroups,
  filter,
  filterChange,
}: CalendarSidebarProps) => {
  return (
    <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebarClose}>
      <div className={styles.profile}>
        <h3>프로필 들어갈 곳</h3>
      </div>
      <div className={styles.divider} />
      <AccordianItem
        title='전체 일정'
        checkboxData={publicGroups.map((group) => ({
          ...group,
          name: group.title || '',
          color: group.backgroundColor || '',
          checked: group.checked ?? false,
        }))}
        checkboxChange={filterChange}
        type='public'
      />
      <AccordianItem
        title='개인 일정'
        checkboxData={privateGroups.map((group) => ({
          ...group,
          name: group.title || '',
          color: group.backgroundColor || '',
          checked: group.checked ?? false,
        }))}
        checkboxChange={filterChange}
        type='private'
      />
    </div>
  );
};

export default CalendarSidebar;
