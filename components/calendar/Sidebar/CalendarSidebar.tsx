import React from 'react';
import styles from 'styles/calendar/CalendarSidebar.module.scss';
import AccordianMenu from './AccordianMenu';

interface CalendarSidebarProps {
  sidebarOpen: boolean;
}

//프로필 부분 작업 필요
const CalendarSidebar = ({ sidebarOpen }: CalendarSidebarProps) => {
  return (
    <div className={sidebarOpen ? styles.sidebarOpen : styles.sidebarClose}>
      <div className={styles.profile}>
        <h3>프로필 들어갈 곳</h3>
      </div>
      <div className={styles.divider} />
      <AccordianMenu />
    </div>
  );
};

export default CalendarSidebar;
