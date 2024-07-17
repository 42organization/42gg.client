import { useState } from 'react';
import DownArrow from 'public/image/agenda/ChevronDown.svg';
import RightArrow from 'public/image/agenda/ChevronRight.svg';
import styles from 'styles/agenda/agendaDetail/taps/Notification.module.scss';

export default function NotificationItem() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.notificationContianer}>
        <div className={styles.toggleWrap}>
          <div onClick={toggleContent}>
            {isOpen ? (
              <DownArrow className={styles.toggleIcon} />
            ) : (
              <RightArrow className={styles.toggleIcon} />
            )}
          </div>
          <div className={styles.titleWarp}>
            <div className={styles.notificationTitle}>대회 공지사항</div>
            <div className={styles.notificationDate}>대회 날짜</div>
          </div>
        </div>
        {isOpen && (
          <div className={styles.notificationContent}>대회 공지사항 내용</div>
        )}
      </div>
    </>
  );
}
