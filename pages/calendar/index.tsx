import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import { Schedule } from 'types/calendar/scheduleTypes';
import CalendarLayout from 'components/calendar/CalendarLayout';
import { GroupProvider } from 'components/calendar/GroupContext';
import CalendarModalProvider from 'components/calendar/modal/CalendarModalProvider';
import { useCalendarModal } from 'components/calendar/modal/useCalendarModal';
import CalendarSidebar from 'components/calendar/Sidebar/CalendarSidebar';
import MenuSVG from 'public/image/calendar/menuIcon.svg';
import useScheduleGet from 'hooks/calendar/useScheduleGet';
import useScheduleGroupGet from 'hooks/calendar/useScheduleGroupGet';
import useScheduleGroupRequest from 'hooks/calendar/useScheduleGroupRequest';
import styles from 'styles/calendar/Calendar.module.scss';

const publicGroupList: ScheduleGroup[] = [
  { id: 'EVENT', title: '42행사', backgroundColor: '#785AD2', checked: true },
  {
    id: 'JOB_NOTICE',
    title: '취업공고',
    backgroundColor: '#A98CFF',
    checked: true,
  },
];

const CalendarPage: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { openModal, isOpen } = useCalendarModal();

  const { scheduleGroup: privateGroupList = [] } =
    useScheduleGroupGet('custom');
  const [filterList, setFilterList] = useState<ScheduleFilter>({
    public: publicGroupList.map((group: ScheduleGroup) => group.id as string),
    private: privateGroupList.map((group: ScheduleGroup) => group.id as number),
  });

  const handleSelectSlot = ({ slots }: { slots: any }) => {
    if (!isOpen) {
      openModal({
        type: 'AddSelect',
        schedule: {
          startTime: slots[0],
          title: '',
          content: '',
          link: '',
          endTime: slots[slots.length - 1],
        },
      });
    }
    return false;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
        setSidebarOpen(true);
      } else {
        setIsMobile(true);
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setOverlayVisible(!overlayVisible);
  };

  const handleFilterChange = (
    type: 'public' | 'private',
    id: string | number
  ) => {
    setFilterList((prev) => {
      let updatedPublic = prev.public;
      let updatedPrivate = prev.private;

      if (type === 'public') {
        updatedPublic = prev.public.includes(id as string)
          ? prev.public.filter((item) => item !== id)
          : [...prev.public, id as string];
      } else {
        updatedPrivate = prev.private.includes(id as number)
          ? prev.private.filter((item) => item !== id)
          : [...prev.private, id as number];
      }

      if (type === 'public') {
        publicGroupList.forEach((group: ScheduleGroup) => {
          if (group.id === id) {
            group.checked = !group.checked;
          }
        });
      } else {
        privateGroupList?.forEach((group: ScheduleGroup) => {
          if (group.id === id) {
            group.checked = !group.checked;
          }
        });
      }

      return { ...prev, public: updatedPublic, private: updatedPrivate };
    });
  };

  //필터링 해주는 함수
  const filterSchedules = (
    schedules: Schedule[],
    filterList: ScheduleFilter
  ) => {
    return schedules.filter((schedule) => {
      const isPublicMatch = schedule.classification
        ? filterList.public.includes(schedule.classification)
        : false;
      const isPrivateMatch = filterList.private.includes(schedule.groupId!);
      return isPublicMatch || isPrivateMatch;
    });
  };

  return (
    <GroupProvider>
      <div className={styles.calendarBody}>
        {isMobile && (
          <MenuSVG
            width={20}
            height={20}
            fill='#B4BDEE'
            className={styles.menuIcon}
            onClick={toggleSidebar}
          />
        )}
        <div className={styles.calendarView}>
          <CalendarSidebar
            sidebarOpen={sidebarOpen}
            publicGroups={publicGroupList}
            privateGroups={privateGroupList}
            filter={filterList}
            filterChange={handleFilterChange}
          />
          {isMobile && (
            <div
              className={`${styles.overlay} ${
                overlayVisible ? styles.show : ''
              }`}
              onClick={toggleSidebar}
            />
          )}
          <CalendarLayout
            filterSchedules={filterSchedules}
            handleSelectSlot={handleSelectSlot}
            filterList={filterList}
          />
        </div>
      </div>
    </GroupProvider>
  );
};

export default CalendarPage;

/*
1. ACTIVE / DEACTIVE 색깔
2. 현재 선택한 필터의 일정만 나오도록
*/
