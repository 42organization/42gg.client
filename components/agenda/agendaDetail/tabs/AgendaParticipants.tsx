import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { instanceInAgenda } from 'utils/axios';
import { AgendaStatus } from 'constants/agenda/agenda';
import ParticipantsList from 'components/agenda/agendaDetail/tabs/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

// const mockData: AgendaDataProps = {
//   agendaTitle: '아 기다리고기다리던대회',
//   agendaContents:
//     '이 대회는 언제부터 시작되어 어쩌구저쩌구 뭐를 겨루려고 했는데 비밀이에요',
//   agendaDeadLine: new Date('2024-07-20'),
//   agendaStartTime: new Date('2024-07-25'),
//   agendaEndTime: new Date('2024-07-30'),
//   agendaMinTeam: 3,
//   agendaMaxTeam: 10,
//   agendaCurrentTeam: 5,
//   agendaMinPeople: 5, // 개인 팀 설정
//   agendaMaxPeople: 5,
//   agendaPoster: null,
//   agendaHost: 'iamgroot',
//   agendaLocation: '서울',
//   agendaStatus: AgendaStatus.ON_GOING,
//   createdAt: new Date('2024-07-01'),
//   announcementTitle: '대회 공지사항',
//   isOfficial: true,
//   agendaisRanking: false,
// };

export default function AgendaParticipants() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const [agendaData, setAgendaData] = useState<AgendaDataProps | null>(null);

  const fetchAgendaData = async () => {
    if (agendaKey) {
      try {
        const res = await instanceInAgenda.get(`?agenda_key=${agendaKey}`);
        setAgendaData(res.data);
        console.log(res.data);
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

  const { agendaMinPeople, agendaMaxPeople, agendaMaxTeam } = agendaData;

  const isTeam = (min: number, max: number) => {
    return min !== max;
  };

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          {isTeam(agendaMinPeople, agendaMaxPeople) ? (
            <ParticipantTeamList max={agendaMaxTeam} />
          ) : (
            <ParticipantsList max={agendaMaxTeam} />
          )}
        </div>
      </div>
    </>
  );
}
