import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { instanceInAgenda } from 'utils/axios';
import { formatDate } from 'components/agenda/utils/formatDate';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaDescription.module.scss';

export default function AgendaDescription() {
  const router = useRouter();
  const { agendaKey } = router.query;
  // 65366665-3964-3664-2d34-3264362d3430
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
    agendaContents,
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
            <h3>간단 설명</h3> {agendaContents}
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
