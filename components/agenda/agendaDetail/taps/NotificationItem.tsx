import { useState } from 'react';
import { formatDate } from 'components/agenda/utils/formatDate';
import DownArrow from 'public/image/agenda/ChevronDown.svg';
import RightArrow from 'public/image/agenda/ChevronRight.svg';
import styles from 'styles/agenda/agendaDetail/taps/Notification.module.scss';

type NotificationItemProps = {
  title: string;
  contents: string;
  createdAt: Date;
};

export default function NotificationItem({
  title,
  contents,
  createdAt,
}: NotificationItemProps) {
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
            <div className={styles.notificationTitle}>{title}</div>
            <div className={styles.notificationDate}>
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        {isOpen && <div className={styles.notificationContent}>{contents}</div>}
      </div>
    </>
  );
}
