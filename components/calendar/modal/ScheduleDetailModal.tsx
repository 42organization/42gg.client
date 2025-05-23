import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import { toastState } from 'utils/recoil/toast';
import SubmitButton from 'components/calendar/button/SubmitButton';
import GroupSelect from 'components/calendar/modal/GroupSelect';
import { useUserId } from 'components/calendar/userContext';
import CloseSVG from 'public/image/calendar/closeIcon.svg';
import EditSVG from 'public/image/calendar/editIcon.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import DeleteSVG from 'public/image/calendar/trashIcon.svg';
import useScheduleRequest from 'hooks/calendar/useScheduleRequest';
import styles from 'styles/calendar/modal/ScheduleDetailModal.module.scss';

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

const ScheduleDetailModal = (props: calendarModalProps) => {
  const { schedule } = props;
  const { openModal, closeModal } = useCalendarModal();
  const [isDropdown, setIsDropdown] = useState(false);
  const { sendCalendarRequest } = useScheduleRequest();
  const setSnackbar = useSetRecoilState(toastState);
  const intraId = useUserId()?.userId ?? null;
  const router = useRouter();

  const handleEditClick = () => {
    if (schedule.classification === 'PRIVATE_SCHEDULE' || schedule.groupId) {
      openModal({ type: 'PrivateUpsert', schedule: schedule });
    } else if (schedule.author === intraId) {
      openModal({ type: 'PublicEdit', schedule: schedule });
    } else {
      setSnackbar({
        toastName: 'permission error',
        severity: 'error',
        message: '🔥 일정 수정 권한이 없습니다 🔥',
        clicked: true,
      });
    }
  };

  const deleteSchedule = async () => {
    let url = '';
    if (schedule.classification === 'PRIVATE_SCHEDULE') {
      url = `private/${schedule.id}`;
    } else if (schedule.groupId) {
      url = `private/imported/${schedule.id}`;
    } else if (schedule.author === intraId) {
      url = `public/${schedule.id}`;
    } else {
      setSnackbar({
        toastName: 'permission error',
        severity: 'error',
        message: '🔥 일정 삭제 권한이 없습니다 🔥',
        clicked: true,
      });
      return;
    }
    await sendCalendarRequest('PATCH', url, schedule, () => {
      closeModal();
    });
  };

  const importSchedule = async (groupId: number) => {
    if (schedule.classification !== 'PRIVATE_SCHEDULE') {
      await sendCalendarRequest(
        'POST',
        `public/${schedule.id}/${groupId}`,
        schedule,
        () => {
          closeModal();
        },
        (error: string) => {
          setSnackbar({
            toastName: 'response error',
            severity: 'error',
            message: '🔥 일정 가져오기에 실패했습니다 🔥',
            clicked: true,
          });
        }
      );
    }
  };

  return (
    <div className={styles.bubbleModal}>
      <div className={styles.buttonContainer}>
        <EditSVG width={15} height={16} onClick={handleEditClick} />
        <DeleteSVG
          width={15}
          height={15}
          onClick={() => {
            deleteSchedule();
          }}
        />
        <CloseSVG width={12} height={12} onClick={closeModal} />
      </div>
      <div className={styles.modalContent}>
        <div className={styles.scheduleInfoContainer}>
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
              {schedule.startTime && schedule.endTime
                ? getPeriod(schedule.startTime, schedule.endTime)
                : ''}
            </div>
            <div className={styles.content}>{schedule.content}</div>
            <div className={styles.link}>
              <LinkSVG width={17} height={17} stroke='#785AD2' />
              <Link href={schedule.link || '#'} legacyBehavior>
                <a
                  className={styles.linkText}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {schedule.link}
                </a>
              </Link>
            </div>
            {schedule.groupId && (
              <div className={styles.alarm}>
                {schedule.alarm ? (
                  <>
                    <NotificationsActiveIcon
                      style={{
                        color: '#785AD2',
                        fontSize: '18px',
                        margin: 0,
                        padding: 0,
                      }}
                      sx={{ margin: 0, padding: 0 }}
                    />
                    <p>전날과 당일 알림 ON</p>
                  </>
                ) : (
                  <>
                    <NotificationsOffIcon
                      style={{
                        color: '#785AD2',
                        fontSize: '18px',
                        margin: 0,
                        padding: 0,
                      }}
                      sx={{ margin: 0, padding: 0 }}
                    />
                    <p>전날과 당일 알림 OFF</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {schedule.classification !== 'PRIVATE_SCHEDULE' &&
          !schedule.groupId && (
            <div className={styles.importButtonContainer}>
              <div className={styles.importButtonDevider}></div>
              <div className={styles.importButton}>
                {isDropdown && schedule && (
                  <GroupSelect
                    isDropdown={isDropdown}
                    setIsDropdown={setIsDropdown}
                    schedule={schedule}
                    importSchedule={importSchedule}
                  />
                )}
                <p>{schedule.sharedCount ? schedule.sharedCount : 0}명 담음!</p>
                <SubmitButton
                  type='import'
                  label='가져오기'
                  onClick={() => setIsDropdown(true)}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ScheduleDetailModal;
