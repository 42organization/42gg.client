import { useEffect } from 'react';
import { CalendarClassification } from 'constants/calendar/calendarConstants';
import { CalendarTable } from 'components/admin/calendar/CalendarTable';
import { useAdminCalendarClassGet } from 'hooks/calendar/admin/useAdminCalendarClassGet';
import { useAdminCalendarTotalGet } from 'hooks/calendar/admin/useAdminCalendarTotalGet';

interface CalenarListTableProps {
  content: string;
}

interface CalendarTableClassProps {
  classification: CalendarClassification;
}

export const CalendarListTable = ({ content }: CalenarListTableProps) => {
  const classification = (() => {
    switch (content) {
      case '이벤트':
        return CalendarClassification.EVENT;
      case '취업':
        return CalendarClassification.JOB;
      case '개인':
        return CalendarClassification.PRIVATE;
      default:
        return undefined;
    }
  })();

  if (classification) {
    return <CalendarTableClass classification={classification} />;
  }
  return <CalendarTableTotal />;
};

const CalendarTableTotal = () => {
  const { data, isLoading, adminCalendarTotalGet } = useAdminCalendarTotalGet();

  useEffect(() => {
    adminCalendarTotalGet();
  }, [adminCalendarTotalGet]);

  if (isLoading) return <div>Loading...</div>;

  return <CalendarTable data={data || []} />;
};

const CalendarTableClass = ({ classification }: CalendarTableClassProps) => {
  const { data, isLoading, adminCalendarClassGet } = useAdminCalendarClassGet();

  useEffect(() => {
    adminCalendarClassGet(classification);
  }, [classification, adminCalendarClassGet]);

  if (isLoading) return <div>Loading....</div>;

  return <CalendarTable data={data || []} />;
};
