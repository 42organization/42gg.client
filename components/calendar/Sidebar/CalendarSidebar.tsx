import styles from 'styles/calendar/CalendarSidebar.module.scss';
import AccordianMenu from './AccordianMenu';

const CalendarSidebar = (sidebarOpen: boolean) => {
  return (
    <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebar}>
      <div className={styles.profile}>
        <h3>프로필 들어갈 곳</h3>
      </div>
      <div className={styles.divider} />
      <AccordianMenu />
    </div>
  );
};

export default CalendarSidebar;
