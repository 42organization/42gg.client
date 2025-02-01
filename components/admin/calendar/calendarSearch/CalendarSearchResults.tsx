import { useCallback } from 'react';
import { CalendarSearchBar } from 'components/admin/calendar/calendarSearch/CalendarSearchBar';
import { CalendarTable } from 'components/admin/calendar/CalendarTable';
import { useAdminCalendarSearchGet } from 'hooks/calendar/admin/useAdminCalendarSearchGet';
import styles from 'styles/admin/calendar/CalendarSearchResults.module.scss';

export interface SearchData {
  typeOption: string;
  content: string;
  startTime: Date | null;
  endTime: Date | null;
}

export const CalendarSearchResults = () => {
  const { data, adminCalendarSearchGet } = useAdminCalendarSearchGet();

  const handleSearchClick = useCallback(
    ({ typeOption, content, startTime, endTime }: SearchData) => {
      if (!typeOption || !content) {
        alert('검색 기준과 검색 내용을 입력해주세요.');
        return;
      }
      const defaultStartTime = '2020-01-01';
      const defaultEndTime = '2100-01-01';
      const parsedStartTime = startTime
        ? startTime.toISOString().split('T')[0]
        : defaultStartTime;
      const parsedEndTime = endTime
        ? endTime.toISOString().split('T')[0]
        : defaultEndTime;

      adminCalendarSearchGet({
        type: typeOption,
        content,
        startTime: parsedStartTime,
        endTime: parsedEndTime,
      });
    },
    [adminCalendarSearchGet]
  );

  return (
    <div className={styles.container}>
      <CalendarSearchBar onSearch={handleSearchClick} />

      {data && <CalendarTable data={data} />}
    </div>
  );
};
