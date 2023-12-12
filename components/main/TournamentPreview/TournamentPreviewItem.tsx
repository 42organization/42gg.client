import styles from 'styles/main/TournamentPreview/TournamentPreviewItem.module.scss';

interface TournamentPreviewItemProps {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

export default function TournamentPreviewItem({
  title,
  startTime,
  endTime,
  status,
}: TournamentPreviewItemProps) {
  function formatTime(timeString: string) {
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      hour12: true,
    });
  }

  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const statusColor = status === 'LIVE' ? 'live' : 'scheduled';

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.titleStatusWrapper}>
        <h4>{title}</h4>
        <div className={`${styles.statusWrapper} ${styles[statusColor]}`}>
          {status === 'LIVE' ? '경기 중' : '예정'}
        </div>
      </div>
      <time>{formattedStartTime}</time> ~ <time>{formattedEndTime}</time>
    </div>
  );
}
