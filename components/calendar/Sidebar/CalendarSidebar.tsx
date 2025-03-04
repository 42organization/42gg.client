import React, { useState, useEffect } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import useScheduleGroupRequest from 'hooks/calendar/useScheduleGroupRequest';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import AccordianItem from './AccordianItem';
import CalendarProfile from './Profile';

interface CalendarSidebarProps {
  sidebarOpen: boolean;
  publicGroups: ScheduleGroup[];
  privateGroups: ScheduleGroup[];
  filter: ScheduleFilter;
  filterChange: (
    type: 'public' | 'private',
    id: number,
    classification: string
  ) => void;
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
  const [updatedPrivateGroups, setUpdatedPrivateGroups] = useState<
    ScheduleGroup[]
  >(privateGroups || []);
  const { sendGroupRequest } = useScheduleGroupRequest();

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
        const updateGroup = prev.find((group) => group.id === id);
        if (updateGroup) {
          sendGroupRequest('PUT', `custom/${id}`, {
            ...updateGroup,
            title: value!,
          });
          return prev.map((group) =>
            group.id === id ? { ...group, title: value || '' } : group
          );
        }
      }
      if (action === 'color') {
        const updateGroup = prev.find((group) => group.id === id);
        if (updateGroup) {
          sendGroupRequest('PUT', `custom/${id}`, {
            ...updateGroup,
            backgroundColor: value!,
          });
          return prev.map((group) =>
            group.id === id ? { ...group, backgroundColor: value || '' } : group
          );
        }
      }
      if (action === 'delete') {
        const deleteGroup = prev.find((group) => group.id === id);
        if (deleteGroup) {
          sendGroupRequest('DELETE', `custom/${id}`, deleteGroup);
        }
        return prev.filter((group) => group.id !== id);
      }
      return prev;
    });
  };

  return (
    <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebarClose}>
      <div className={styles.profile}>
        <CalendarProfile />
      </div>
      <div className={styles.divider} />
      <AccordianItem
        title='전체 일정'
        checkboxData={publicGroups.map((group) => ({
          ...group,
          name: group.title || '',
          color: group.backgroundColor || '',
          checked: filter.public.includes(group.classification as string),
          // checked: group.checked || true,
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
          // checked: group.checked || true,
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
