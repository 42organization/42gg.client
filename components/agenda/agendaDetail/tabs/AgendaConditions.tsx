import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaConditions.module.scss';

const mockData: AgendaDataProps = {
  agendaTitle: '아 기다리고기다리던대회',
  agendaContents:
    '이 대회는 언제부터 시작되어 어쩌구저쩌구 뭐를 겨루려고 했는데 비밀이에요',
  agendaDeadLine: new Date('2024-07-20'),
  agendaStartTime: new Date('2024-07-25'),
  agendaEndTime: new Date('2024-07-30'),
  agendaMinTeam: 3,
  agendaMaxTeam: 10,
  agendaCurrentTeam: 5,
  agendaMinPeople: 2,
  agendaMaxPeople: 5,
  agendaPoster: null, // 이미지가 없는 경우 null로 설정
  agendaHost: 'iamgroot',
  agendaLocation: '서울',
  agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
  agendaisRanking: true,
};

export default function AgendaConditions() {
  const [agendaData, setAgendaData] = useState<AgendaDataProps | null>(null);

  useEffect(() => {
    setAgendaData(mockData);
  }, []);
  if (!agendaData) {
    return <div>Loading...</div>;
  }
  const {
    agendaMinPeople,
    agendaMaxPeople,
    agendaMinTeam,
    agendaMaxTeam,
    agendaLocation,
  } = agendaData;

  return (
    <>
      <div className={styles.agendaConditionsContainer}>
        <div className={styles.conditionTitle}>대회 참여 조건</div>
        <div className={styles.conditionWarp}>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>팀 인원</span>
            {' : '}
            {agendaMinPeople} ~ {agendaMaxPeople}
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>최소 팀</span> {' : '}{' '}
            {agendaMinTeam}
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>최대 팀</span> {' : '}
            {agendaMaxTeam}
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>장소</span>
            {' : '} {agendaLocation}
          </div>
        </div>
      </div>
    </>
  );
}
