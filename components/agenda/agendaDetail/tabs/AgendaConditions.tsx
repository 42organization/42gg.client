import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { instanceInAgenda } from 'utils/axios';
import { AgendaLocation, AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaConditions.module.scss';

export default function AgendaConditions() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const [agendaData, setAgendaData] = useState<AgendaDataProps | null>(null);

  const fetchAgendaData = async () => {
    if (agendaKey) {
      try {
        const res = await instanceInAgenda.get(`?agenda_key=${agendaKey}`);
        setAgendaData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAgendaData();
  }, [agendaKey]);

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

  const location =
    agendaLocation == AgendaLocation.SEOUL
      ? '서울'
      : agendaLocation == AgendaLocation.GYEONGSAN
      ? '경산'
      : '서울, 경산';

  const teamPeople =
    agendaMinPeople === agendaMaxPeople
      ? `개인`
      : `${agendaMinPeople} ~ ${agendaMaxPeople}명`;
  return (
    <>
      <div className={styles.agendaConditionsContainer}>
        <div className={styles.conditionTitle}>대회 참여 조건</div>
        <div className={styles.conditionWarp}>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>팀 인원</span>
            {' : '}
            {teamPeople}
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>최소 팀</span> {' : '}{' '}
            {agendaMinTeam}팀
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>최대 팀</span> {' : '}
            {agendaMaxTeam}팀
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.boldText}>장소</span>
            {' : '} {location}
          </div>
        </div>
      </div>
    </>
  );
}
