import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import { formatDate } from 'components/agenda/utils/formatDate';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaDescription.module.scss';

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

export default function AgendaDescription() {
  // axios로 받아온 데이터
  // agenda?agenda_id=${agendaKey}
  const [agendaData, setAgendaData] = useState(null);

  useEffect(() => {
    // axios.get(`/api/agenda?agenda_id=${agendaKey}`)
    //   .then(response => setAgendaData(response.data))
    //   .catch(error => console.error(error));

    setAgendaData(mockData);
  }, []);
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
