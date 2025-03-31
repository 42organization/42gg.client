import styles from 'styles/admin/calendar/CalendarHeader.module.scss';

interface CalendarHeaderProps {
  title: string;
}

export const CalendarHeader = ({ title }: CalendarHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
