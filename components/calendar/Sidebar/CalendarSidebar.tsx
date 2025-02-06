import Image from 'next/image';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import AccordianMenu from './AccordianMenu';

interface CalendarSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CalendarSidebar = ({
  sidebarOpen,
  toggleSidebar,
}: CalendarSidebarProps) => {
  console.log(sidebarOpen);
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
