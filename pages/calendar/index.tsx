import { NextPage } from 'next';
import AddSelect from 'components/calendar/modal/AddSelect';
import PrivateScheduleAddModal from 'components/calendar/modal/PrivateScheduleAddModal';
import ScheduleDetailModal from 'components/calendar/modal/ScheduleDetailModal';
import styles from 'styles/calendar/Calendar.module.scss';
import CalendarLayout from '../../components/calendar/CalendarLayout';

const CalendarPage: NextPage = () => {
  return (
    <div className={styles.calendarBody}>
      <CalendarLayout />
      {/* <ScheduleDetailModal
        schedule={{
          id: 1,
          classification: 'EVENT',
          jobTag: 'SHORTS_INTERN',
          techTag: 'FRONT_END',
          author: 'seykim',
          title: 'JOB test',
          content: 'test',
          link: 'string',
          startTime: '2025-01-06T06:28:46.655Z',
          endTime: '2025-01-08T06:28:46.655Z',
          sharedCount: 16,
        }}
        onClose={() => console.log('Modal closed')}
      /> */}
    </div>
  );
};

export default CalendarPage;
