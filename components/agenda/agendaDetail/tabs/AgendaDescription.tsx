import { AgendaProps } from 'types/agenda/agendaDetail/agendaTypes';
import { formatDate } from 'utils/agenda/formatDate';
import AgendaTags from 'components/agenda/utils/AgendaTags';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaDescription.module.scss';

export default function AgendaDescription({ agendaData }: AgendaProps) {
  const {
    agendaContent,
    agendaDeadLine,
    agendaStartTime,
    agendaEndTime,
    isOfficial,
    agendaisRanking,
    agendaMinPeople,
    agendaMaxPeople,
    agendaMinTeam,
    agendaMaxTeam,
  } = agendaData;

  const teamPeople =
    agendaMinPeople === agendaMaxPeople
      ? `개인`
      : `${agendaMinPeople} ~ ${agendaMaxPeople}명`;

  const additionalInfo = [
    { label: '모집 팀', value: `${agendaMinTeam}팀 ~ ${agendaMaxTeam}팀` },
    { label: '팀 인원', value: teamPeople },
    { label: '시상 여부', value: agendaisRanking ? '시상 있음' : '시상 없음' },
    { label: '공식대회 여부', value: isOfficial ? '공식대회' : '비공식대회' },
  ];

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.descriptionTitle}>대회 정보</div>
      {AgendaTags(agendaData)}
      <div className={styles.descriptionWarp}>
        <div className={styles.midContainer}>
          <div className={styles.descriptionItem}>
            <h3>대회 설명</h3>
            <span className={styles.preWrap}>{agendaContent}</span>
          </div>
          <div className={styles.descriptionItem}>
            <h3>모집 완료 기간</h3>
            <span>{formatDate(agendaDeadLine)}</span>
          </div>
          <div className={styles.descriptionItem}>
            <h3>이벤트 기간</h3>
            <div className={styles.dateContainer}>
              <p>{formatDate(agendaStartTime)}</p>
              <p>{`~ ${formatDate(agendaEndTime)}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.midContainer}>
        {additionalInfo.map((item, index) => (
          <div key={index} className={styles.rowDescriptionItem}>
            <p className={styles.boldText}>{item.label}</p>
            {' : '}
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
