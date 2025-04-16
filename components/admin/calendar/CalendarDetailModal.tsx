import React from 'react';
import { Modal, Box } from '@mui/material';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import {
  CalendarClassification,
  eventTagLabels,
  jobTagLabels,
  techTagLabels,
} from 'constants/calendar/calendarConstants';
import styles from 'styles/calendar/Form/CalendarForm.module.scss';

interface CalendarDetailModalProps {
  data: AdminSchedule | null;
  onClose: () => void;
}

export const CalendarDetailModal = ({
  data,
  onClose,
}: CalendarDetailModalProps) => {
  console.log(data);
  if (data === null) {
    return null;
  }
  const {
    title,
    content,
    link,
    startTime,
    endTime,
    classification,
    eventTag,
    jobTag,
    techTag,
  } = data;

  return (
    <Modal open={true} onClose={onClose}>
      <Box className={`${styles.container} ${styles.modalCenter}`}>
        <div className={styles.formHeaderContainer}>일정 상세</div>

        <div className={styles.formContainer}>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>제목</div>
            <div className={styles.detailTitle}>{title}</div>
          </div>

          <div className={styles.detailTagWrapper}>
            <div className={styles.label}>태그</div>
            <div className={styles.detailTagField}>
              <div className={styles.detailSelectTagContainer}>
                <div className={`${styles.tagItem} ${styles.detailText}`}>
                  #{' '}
                  {classification === CalendarClassification.EVENT
                    ? '42서울일정'
                    : '취업 공고'}
                </div>
              </div>

              {classification === CalendarClassification.EVENT && eventTag && (
                <div className={styles.subTagWrapper}>
                  <div className={styles.detailText}>
                    # {eventTagLabels[eventTag]}
                  </div>
                </div>
              )}

              {classification === CalendarClassification.JOB && jobTag && (
                <div className={styles.subTagJobWrapper}>
                  <div className={styles.detailText}>
                    # {jobTagLabels[jobTag]}
                  </div>
                </div>
              )}

              {classification === CalendarClassification.JOB && techTag && (
                <div className={styles.subTagWrapper}>
                  <div className={styles.detailText}>
                    # {techTagLabels[techTag]}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.contentLabel}>내용</div>
            <div className={styles.detailTextareaField}>{content}</div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.label}>날짜</div>
            <div className={styles.detailDatePickerContainer}>
              {new Date(startTime).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
              <span> - </span>
              {new Date(endTime).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.label}>링크</div>
            <div className={styles.detailInputField}>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                {link}
              </a>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
