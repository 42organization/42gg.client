import Image from 'next/image';
import styles from 'styles/calendar/CalendarHeader.module.scss';

const CalendarHeader = (props) => {
  const { date } = props;

  // 날짜를 "Month Year" 형식으로 포맷
  const getFormattedDate = () => {
    const options = { month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // 네비게이션 함수
  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className={styles.headerContainer}>
      <Image
        src='/image/calendar/chevronArrowRight.svg'
        width={15}
        height={15}
        alt='prev month'
        onClick={navigate.bind(null, 'PREV')}
        style={{ transform: 'rotate(180deg)' }}
        className={styles.button}
      />
      <p className={styles.dateText}>{getFormattedDate()}</p>
      <Image
        src='/image/calendar/chevronArrowRight.svg'
        width={15}
        height={15}
        alt='next month'
        onClick={navigate.bind(null, 'NEXT')}
        className={styles.button}
      />
    </div>
  );
};

export default CalendarHeader;
