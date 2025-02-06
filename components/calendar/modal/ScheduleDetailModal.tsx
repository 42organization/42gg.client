import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Close } from '@mui/icons-material';
import { Schedule } from 'types/calendar/scheduleTypes';
import CloseSVG from 'public/image/calendar/closeIcon.svg';
import EditSVG from 'public/image/calendar/editIcon.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import DeleteSVG from 'public/image/calendar/trashIcon.svg';
import styles from 'styles/calendar/modal/ScheduleDetailModal.module.scss';

interface ScheduleDetailModalProps {
  schedule: Schedule;
  onClose: () => void;
}

const parseDate = (data: string) => {
  const date = new Date(data);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getPeriod = (start: string, end: string) => {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (startDate === endDate) {
    return startDate;
  } else if (startDate.split(' ')[0] === endDate.split(' ')[0]) {
    return `${startDate} - ${endDate.split(' ')[1]} ${endDate.split(' ')[2]}`;
  }
  return `${startDate} - ${endDate}`;
};

// const ScheduleDetailModal = () => {
const ScheduleDetailModal = ({
  schedule,
  onClose,
}: ScheduleDetailModalProps) => {
  return (
    <div className={styles.bubbleModal}>
      <div className={styles.buttonContainer}>
        <EditSVG width={11} height={12} />
        <DeleteSVG width={12} height={12} />
        <CloseSVG width={9} height={9} onClick={onClose} />
      </div>
      <div className={styles.modalContent}>
        <div
          className={styles.groupIndex}
          style={{
            backgroundColor: schedule.groupId
              ? schedule.groupColor
              : schedule.classification === 'EVENT'
              ? '#785AD2'
              : '#A98CFF',
          }}
        />
        <div className={styles.scheduleInfo}>
          <div className={styles.title}>{schedule.title}</div>
          <div className={styles.date}>
            {getPeriod(schedule.startTime, schedule.endTime)}
          </div>
          <div className={styles.content}>{schedule.content}</div>
          <div className={styles.link}>
            <LinkSVG width={6} height={7} stroke='#785AD2' />
            <Link href={schedule.link}>{schedule.link}</Link>
          </div>
        </div>
        <div className={styles.importButton}>
          <p>{schedule.sharedCount}명 담음!</p>
          <div className={styles.button}>가져오기</div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailModal;
