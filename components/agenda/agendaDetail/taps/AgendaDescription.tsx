import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/taps/AgendaDescription.module.scss';

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

  const { agendaContents } = agendaData;

  // const agendaContents =
  //   '대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n';
  return (
    <>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionTitle}>대회설명 제목</div>
        <div className={styles.descriptionWarp}>{agendaContents}</div>
      </div>
    </>
  );
}
