import { AgendaProps } from 'types/agenda/agendaDetail/agendaTypes';
import { formatDate } from 'utils/agenda/formatDate';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaDescription.module.scss';

export default function AgendaDescription({ agendaData }: AgendaProps) {
  const {
    agendaContent,
    agendaDeadLine,
    agendaStartTime,
    agendaEndTime,
    isOfficial,
    agendaisRanking,
  } = agendaData;

  return (
    <>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionTitle}>대회 정보</div>
        <div className={styles.descriptionWarp}>
          <div className={styles.descriptionItem}>
            <h3>간단 설명</h3> {agendaContent}
          </div>
          <div className={styles.descriptionItem}>
            <h3>모집 완료 기간</h3> ~ {formatDate(agendaDeadLine)}
          </div>
          <div className={styles.descriptionItem}>
            <h3>이벤트 기간</h3>{' '}
            {`${formatDate(agendaStartTime)} ~ ${formatDate(agendaEndTime)}`}
          </div>
          <div className={styles.descriptionItem}>
            <h3>시상 여부</h3> {agendaisRanking ? '시상 있음' : '시상 없음'}
          </div>
          <div className={styles.descriptionItem}>
            <h3>공식대회 여부</h3> {isOfficial ? '공식대회' : '비공식대회'}
          </div>
        </div>
      </div>
    </>
  );
}
