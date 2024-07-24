import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import ParticipantsList from 'components/agenda/agendaDetail/taps/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/taps/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

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
  agendaMinPeople: 5, // 개인 팀 설정
  agendaMaxPeople: 5,
  agendaPoster: null,
  agendaHost: 'iamgroot',
  agendaLocation: '서울',
  agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
};

export default function AgendaParticipants() {
  const [agendaData, setAgendaData] = useState(null);

  useEffect(() => {
    setAgendaData(mockData);
  }, []);
  if (!agendaData) {
    return <div>Loading...</div>;
  }

  const { agendaMinPeople, agendaMaxPeople } = agendaData;

  const isTeam = (min: number, max: number) => {
    return min !== max;
  };

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          {isTeam(agendaMinPeople, agendaMaxPeople) ? (
            <ParticipantTeamList />
          ) : (
            <ParticipantsList />
          )}
        </div>
      </div>
    </>
  );
}
