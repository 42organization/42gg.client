import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import { toastState } from 'utils/recoil/toast';
import AccordianItem from 'components/calendar/sidebar/AccordianItem';
import CalendarProfile from 'components/calendar/sidebar/Profile';
import useScheduleGroupRequest from 'hooks/calendar/useScheduleGroupRequest';
import styles from 'styles/calendar/CalendarSidebar.module.scss';

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
  const setSnackbar = useSetRecoilState(toastState);
  const router = useRouter();

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
          sendGroupRequest(
            'PUT',
            `custom/${id}`,
            {
              ...updateGroup,
              title: value!,
            },
            () => {
              setUpdatedPrivateGroups((prev) =>
                prev.map((group) =>
                  group.id === id ? { ...group, title: value || '' } : group
                )
              );
            },
            (error: string) => {
              setSnackbar({
                toastName: 'post error',
                severity: 'error',
                message: '그룹 이름 수정에 실패했습니다.',
                clicked: true,
              });
            }
          );
          return prev.map((group) =>
            group.id === id ? { ...group, title: value || '' } : group
          );
        }
      }
      if (action === 'color') {
        const updateGroup = prev.find((group) => group.id === id);
        if (updateGroup) {
          sendGroupRequest(
            'PUT',
            `custom/${id}`,
            {
              ...updateGroup,
              backgroundColor: value!,
            },
            () => {
              setUpdatedPrivateGroups((prev) =>
                prev.map((group) =>
                  group.id === id ? { ...group, title: value || '' } : group
                )
              );
            },
            (error: string) => {
              setSnackbar({
                toastName: 'post error',
                severity: 'error',
                message: '그룹 컬러 수정에 실패했습니다.',
                clicked: true,
              });
            }
          );
          return prev.map((group) =>
            group.id === id ? { ...group, backgroundColor: value || '' } : group
          );
        }
      }
      if (action === 'delete') {
        const deleteGroup = prev.find((group) => group.id === id);
        if (deleteGroup) {
          sendGroupRequest(
            'DELETE',
            `custom/${id}`,
            deleteGroup,
            () => {
              setUpdatedPrivateGroups((prev) =>
                prev.filter((group) => group.id !== id)
              );
            },
            () => {
              setSnackbar({
                toastName: 'post error',
                severity: 'error',
                message: '그룹 삭제에 실패했습니다.',
                clicked: true,
              });
            }
          );
        }
      }

      return prev;
    });
  };

  return (
    <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebarClose}>
      <div className={styles.profile}>
        <IconButton
          className={styles.backButton}
          onClick={() => router.back()}
          size='small'
        >
          <ArrowBackIcon />
        </IconButton>
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
