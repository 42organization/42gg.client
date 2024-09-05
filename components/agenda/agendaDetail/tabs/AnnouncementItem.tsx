import { useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import { formatDate } from 'utils/agenda/formatDate';
import DownArrow from 'public/image/agenda/ChevronDown.svg';
import RightArrow from 'public/image/agenda/ChevronRight.svg';
import styles from 'styles/agenda/agendaDetail/tabs/AnnouncementItem.module.scss';

export default function AnnouncementItem({
  title,
  content,
  createdAt,
  isSelected,
  isListSelected,
  setSelected,
}: AnnouncementProps) {
  const [isOpen, setIsOpen] = useState(isSelected || false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${styles.announcementContianer} ${
          isSelected && styles.web
        } ${isListSelected && styles.selected}`}
        onClick={() => setSelected && setSelected()}
      >
        <div className={styles.toggleWrap}>
          <div onClick={toggleContent} className={styles.mobile}>
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
        {isOpen && <div className={styles.announcementContent}>{content}</div>}
      </div>
    </>
  );
}
