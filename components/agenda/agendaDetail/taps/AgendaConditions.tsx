import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/taps/AgendaConditions.module.scss';

const mockData = {
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
};

export default function AgendaConditions() {
  // const content =
  //   '이 대회에참가하려면 어쩌구저쩌구 포인트얼마를내야하며 상품은 뭔데 줄지안줄지 생각해볼게';
  const [agendaData, setAgendaData] = useState(null);

  useEffect(() => {
    setAgendaData(mockData);
  }, []);
  if (!agendaData) {
    return <div>Loading...</div>;
  }

  const { agendaContents } = agendaData;

  return (
    <>
      <div className={styles.agendaConditionsContainer}>
        <div className={styles.conditionTitle}>대회 참여 조건 제목</div>
        <div className={styles.conditionWarp}>{agendaContents}</div>
        {/* 어떤 형식으로 조건 추가할지 생각해보기 */}
      </div>
    </>
  );
}
