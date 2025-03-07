import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import { Schedule } from 'types/calendar/scheduleTypes';
import CalendarLayout from 'components/calendar/CalendarLayout';
import { GroupProvider } from 'components/calendar/GroupContext';
import { useCalendarModal } from 'components/calendar/modal/useCalendarModal';
import CalendarSidebar from 'components/calendar/Sidebar/CalendarSidebar';
import { UserProvider } from 'components/calendar/userContext';
import MenuSVG from 'public/image/calendar/menuIcon.svg';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useScheduleGroupGet from 'hooks/calendar/useScheduleGroupGet';
import styles from 'styles/calendar/Calendar.module.scss';

const publicGroupList: ScheduleGroup[] = [
  {
    classification: 'EVENT',
    title: '42행사',
    backgroundColor: '#785AD2',
    checked: true,
  },
  {
    classification: 'JOB_NOTICE',
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
  const { intraId } = useUser() || {};

  const { scheduleGroup: privateGroupList = [] } =
    useScheduleGroupGet('custom');

  const [filterList, setFilterList] = useState<ScheduleFilter>({
    public: [],
    private: [],
  });

  useEffect(() => {
    const savedFilters = localStorage.getItem('scheduleFilters');

    if (savedFilters) {
      setFilterList(JSON.parse(savedFilters));
    } else {
      const initialFilterList: ScheduleFilter = {
        public: publicGroupList.map(
          (group: ScheduleGroup) => group.classification!
        ),
        private: privateGroupList.map((group: ScheduleGroup) => group.id!),
      };

      setFilterList(initialFilterList);
      localStorage.setItem(
        'scheduleFilters',
        JSON.stringify(initialFilterList)
      );
    }
  }, [privateGroupList]);

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
    id?: number,
    classification?: string
  ) => {
    setFilterList((prev) => {
      let updatedPublic = prev.public;
      let updatedPrivate = prev.private;

      if (type === 'public') {
        updatedPublic = prev.public.includes(classification!)
          ? prev.public.filter((item) => item !== classification)
          : [...prev.public, classification!];
      } else {
        updatedPrivate = prev.private.includes(id!)
          ? prev.private.filter((item) => item !== id)
          : [...prev.private, id!];
      }

      if (type === 'public') {
        publicGroupList.forEach((group: ScheduleGroup) => {
          if (group.classification === classification) {
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

      const newFilterList = {
        ...prev,
        public: updatedPublic,
        private: updatedPrivate,
      };

      localStorage.setItem('scheduleFilters', JSON.stringify(newFilterList));

      return newFilterList;
    });
  };

  //필터링 해주는 함수
  const filterSchedules = (
    schedules: Schedule[],
    filterList: ScheduleFilter
  ) => {
    return schedules.filter((schedule) => {
      const isPublicMatch = filterList.public.includes(
        schedule.classification!
      );
      const isPrivateMatch = filterList.private.includes(schedule.groupId!);
      if (schedule.classification !== 'PUBLIC_SCHEDULE' && schedule.groupId) {
        return isPrivateMatch;
      }
      return isPublicMatch || isPrivateMatch;
    });
  };

  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default CalendarPage;

/*
1. 알람 기능
2. 처음에 그룹 아무것도 없을때 

1. ACTIVE / DEACTIVE 색깔 (완)
2. 현재 선택한 필터의 일정만 나오도록(완) -> 필터링 하는 부분 커스텀 훅으로 리팩토링
3. ui에 알람 관련해서 추가
4. 모달 띄운 채로 일정 공유 가능한가 https://velog.io/@mjieun/Next.js-%EB%AA%A8%EB%8B%AC-%EC%97%B4%EB%A9%B4%EC%84%9C-URL-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0-Parallel-Routes-Intercepting-Routes
5. 가져오기 부분 api, 기능 (완)
6. 처음에 그룹이 아무것도 없을때 
7. 사이드바 프로필
*/
