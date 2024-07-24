import { useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import { formatDate } from 'components/agenda/utils/formatDate';
import DownArrow from 'public/image/agenda/ChevronDown.svg';
import RightArrow from 'public/image/agenda/ChevronRight.svg';
import styles from 'styles/agenda/agendaDetail/taps/AnnouncementItem.module.scss';

export default function AnnouncementItem({
  title,
  contents,
  createdAt,
}: AnnouncementProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.announcementContianer}>
        <div className={styles.toggleWrap}>
          <div onClick={toggleContent}>
            {isOpen ? (
              <DownArrow className={styles.toggleIcon} />
            ) : (
              <RightArrow className={styles.toggleIcon} />
            )}
          </div>
          <div className={styles.titleWarp}>
            <div className={styles.announcementTitle}>{title}</div>
            <div className={styles.announcementDate}>
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        {isOpen && <div className={styles.announcementContent}>{contents}</div>}
      </div>
    </>
  );
}
