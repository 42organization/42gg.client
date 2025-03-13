import Image from 'next/image';
import React from 'react';
import styles from 'styles/calendar/CalendarHeader.module.scss';

function CalendarHeader(props: { onNavigate?: any; date?: any }) {
  const { date } = props;

  // 날짜를 "Month Year" 형식으로 포맷
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // 네비게이션 함수
  interface CalendarHeaderProps {
    onNavigate?: (action: string) => void;
    date?: Date;
  }

  const navigate = (action: 'PREV' | 'NEXT') => {
    props.onNavigate?.(action);
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
}

export default CalendarHeader;
