import { NextPage } from 'next';
import PrivateScheduleAddModal from 'components/calendar/modal/PrivateScheduleAddModal';
import ScheduleDetailModal from 'components/calendar/modal/ScheduleDetailModal';
import styles from 'styles/calendar/Calendar.module.scss';
import CalendarLayout from '../../components/calendar/CalendarLayout';

const CalendarPage: NextPage = () => {
  return (
    <div className={styles.calendarBody}>
      <CalendarLayout />
      {/* <PrivateScheduleAddModal
                schedule={{
                    id: 3,
                    classification: 'PRIVATE_SCHEDULE',
                    author: 'seykim',
                    title: 'PRIVATE test',
                    content: '내용 내용 내용 내용',
                    link: 'https://www.naver.com',
                    startTime: '2025-01-28T06:28:46.655Z',
                    endTime: '2025-01-31T06:28:46.655Z',
                    groupId: 1,
                    groupTitle: 'group-test',
                    groupColor: '#7DC163',
                }}
                onClose={() => console.log('Modal closed')}
            /> */}
    </div>
  );
};

export default CalendarPage;
