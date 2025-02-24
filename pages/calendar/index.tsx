import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import { Schedule } from 'types/calendar/scheduleTypes';
import CalendarLayout from 'components/calendar/CalendarLayout';
import CalendarModalProvider from 'components/calendar/modal/CalendarModalProvider';
import { useCalendarModal } from 'components/calendar/modal/useCalendarModal';
import CalendarSidebar from 'components/calendar/Sidebar/CalendarSidebar';
import MenuSVG from 'public/image/calendar/menuIcon.svg';
import styles from 'styles/calendar/Calendar.module.scss';

const scheduleData: Schedule[] = [
  {
    id: 1,
    classification: 'JOB_NOTICE',
    jobTag: 'SHORTS_INTERN',
    techTag: 'FRONT_END',
    author: 'seykim',
    title: 'JOB test',
    content: 'test',
    link: 'string',
    startTime: '2025-01-06T06:28:46.655Z',
    endTime: '2025-01-08T06:28:46.655Z',
  },
  {
    id: 2,
    classification: 'EVENT',
    eventTag: 'ETC',
    author: 'seykim',
    title: 'EVENT test',
    content: 'string',
    link: 'string',
    startTime: '2025-01-06T06:28:46.655Z',
    endTime: '2025-01-10T06:28:46.655Z',
  },
  {
    id: 3,
    classification: 'PRIVATE_SCHEDULE',
    author: 'seykim',
    title: 'PRIVATE test',
    content: 'string',
    link: 'string',
    startTime: '2025-02-06T06:28:46.655Z',
    endTime: '2025-02-06T06:28:46.655Z',
    groupId: 1,
    groupTitle: 'group-test',
    groupColor: '#7DC163',
  },
  {
    id: 4,
    classification: 'PRIVATE_SCHEDULE',
    author: 'seykim',
    title: 'PRIVATE test2',
    content: 'string',
    link: 'string',
    startTime: '2025-01-01T06:28:46.655Z',
    endTime: '2025-01-02T06:28:46.655Z',
    groupId: 1,
    groupTitle: 'group-test',
    groupColor: '#7DC163',
  },
];

const PublicGroupList: ScheduleGroup[] = [
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

  const [privateGroupList, setPrivateGroupList] = useState<ScheduleGroup[]>([
    { id: 1, title: 'group1', backgroundColor: '#7DC163', checked: true },
    { id: 2, title: 'group2', backgroundColor: '#E99A45', checked: true },
  ]); //GET 요청으로 받아올 그룹 리스트
  const [filterList, setFilterList] = useState<ScheduleFilter>({
    public: PublicGroupList.map((group) => group.id).filter(
      (id): id is string => typeof id === 'string'
    ),
    private: privateGroupList
      .map((group) => group.id)
      .filter((id): id is number => typeof id === 'number'),
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
      if (type === 'public') {
        let updatedPublic;

        if (prev.public.includes(id as string)) {
          updatedPublic = prev.public.filter((item) => item !== id);
        } else {
          updatedPublic = [...prev.public, id as string];
        }

        return {
          ...prev,
          public: updatedPublic,
        };
      } else {
        if (prev.private.includes(id as number)) {
          return {
            ...prev,
            private: prev.private.filter((item) => item !== id),
          };
        } else {
          return { ...prev, private: [...prev.private, id as number] };
        }
      }
    });
  };

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
          publicGroups={PublicGroupList}
          privateGroups={privateGroupList}
          filter={filterList}
          filterChange={handleFilterChange}
        />
        {isMobile && (
          <div
            className={`${styles.overlay} ${overlayVisible ? styles.show : ''}`}
            onClick={toggleSidebar}
          />
        )}
        <CalendarLayout
          filterSchedules={filterSchedules}
          handleSelectSlot={handleSelectSlot}
          filterList={filterList}
          scheduleData={scheduleData}
        />
        <CalendarModalProvider />
      </div>
    </div>
  );
};

export default CalendarPage;
