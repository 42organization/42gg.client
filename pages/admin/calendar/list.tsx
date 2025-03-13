import { useState, useCallback } from 'react';
import { CalendarHeader } from 'components/admin/calendar/CalendarHeader';
import { CalendarListTab } from 'components/admin/calendar/calendarList/CalendarListTab';
import { CalendarListTable } from 'components/admin/calendar/calendarList/CalendarListTable';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarList() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const tabContents = ['전체', '이벤트', '취업', '개인'];

  const handleTabClick = useCallback((index: number) => {
    setActiveIdx(index);
  }, []);

  return (
    <div className={styles.container}>
      <CalendarHeader title='캘린더 조회' />

      <CalendarListTab
        activeIdx={activeIdx}
        tabContents={tabContents}
        onTabClick={handleTabClick}
      />

      <CalendarListTable content={tabContents[activeIdx]} />
    </div>
  );
}
