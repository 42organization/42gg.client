import React, { useState, useEffect } from 'react';
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
  const [isEdit, setIsEdit] = useState(false);
  const [updatedPrivateGroups, setUpdatedPrivateGroups] =
    useState(privateGroups);

  useEffect(() => {
    setUpdatedPrivateGroups(
      privateGroups.map((group) => ({
        ...group,
        checked: filter.private.includes(group.id as number),
      }))
    );
  }, [privateGroups, filter.private]);

  const handleEdit = (
    action: 'name' | 'color' | 'delete',
    id: string | number,
    value?: string
  ) => {
    setUpdatedPrivateGroups((prev) => {
      if (action === 'name') {
        return prev.map((group) =>
          group.id === id ? { ...group, title: value || '' } : group
        );
      }
      if (action === 'color') {
        return prev.map((group) =>
          group.id === id ? { ...group, backgroundColor: value || '' } : group
        );
      }
      if (action === 'delete') {
        return prev.filter((group) => group.id !== id);
      }
      return prev;
    });
  };

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
          checked: filter.public.includes(group.id as string),
        }))}
        onCheckboxChange={filterChange}
        type='public'
      />
      <AccordianItem
        title='개인 일정'
        checkboxData={updatedPrivateGroups.map((group) => ({
          ...group,
          name: group.title || '',
          color: group.backgroundColor || '',
          checked: filter.private.includes(group.id as number),
        }))}
        onCheckboxChange={filterChange}
        type='private'
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default CalendarSidebar;
