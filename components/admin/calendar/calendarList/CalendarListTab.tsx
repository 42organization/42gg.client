import styles from 'styles/admin/calendar/CalendarListTab.module.scss';

interface CalendarListTabProps {
  activeIdx: number;
  tabContents: string[];
  onTabClick: (index: number) => void;
}

export const CalendarListTab = ({
  activeIdx,
  tabContents,
  onTabClick,
}: CalendarListTabProps) => {
  return (
    <ul className={styles.tabContainer}>
      {tabContents.map((content, index) => (
        <li
          key={index}
          className={activeIdx === index ? styles.active : styles.inactive}
          onClick={() => onTabClick(index)}
        >
          {content}
        </li>
      ))}
    </ul>
  );
};
