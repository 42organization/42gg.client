import React, { useEffect, useState } from 'react';
import ParticipantTeam from 'components/agenda/agendaDetail/taps/ParticipantTeam';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantTeamList.module.scss';

const agendaMockData = {
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
  // agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
};
interface agendaDataProps {
  agendaTitle: string;
  agendaContents: string;
  agendaDeadLine: Date;
  agendaStartTime: Date;
  agendaEndTime: Date;
  agendaMinTeam: number;
  agendaMaxTeam: number;
  agendaCurrentTeam: number;
  agendaMinPeople: number;
  agendaMaxPeople: number;
  agendaPoster: any;
  agendaHost: string;
  agendaLocation: string;
  createdAt: Date;
  announcementTitle: string;
  isOfficial: boolean;
}

const teamData = [
  {
    teamName: '팀 A',
    teamLeaderIntraId: 'leaderA',
    teamMateCount: 3,
    teamKey: '1',
  },
  {
    teamName: '팀 B',
    teamLeaderIntraId: 'leaderB',
    teamMateCount: 2,
    teamKey: 'key2',
  },
  {
    teamName: '팀 C',
    teamLeaderIntraId: 'leaderC',
    teamMateCount: 4,
    teamKey: 'key3',
  },
  {
    teamName: '팀 D',
    teamLeaderIntraId: 'leaderD',
    teamMateCount: 1,
    teamKey: 'key4',
  },
];

interface teamDataProps {
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  teamKey: string;
}

export default function ParticipantTeamList() {
  const [agendaData, setAgendaData] = useState<agendaDataProps | null>(null);
  const [currentTeams, setCurrentTeams] = useState<teamDataProps[]>([]);
  const [confirmedTeams, setConfirmedTeams] = useState<teamDataProps[]>([]);

  useEffect(() => {
    setAgendaData(agendaMockData);
  }, []);

  useEffect(() => {
    if (agendaData) {
      // // 모집 중인 팀 API 호출
      // const fetchCurrentTeams = async () => {};

      // // 확정 완료 팀 API 호출
      // const fetchConfirmedTeams = async () => {};

      setCurrentTeams(teamData);
      setConfirmedTeams(teamData);
    }
  }, [agendaData]);

  if (!agendaData) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          모집중인 팀 {currentTeams.length}
        </div>
        {currentTeams.map((team) => (
          <ParticipantTeam
            key={team.teamKey}
            teamKey={team.teamKey}
            teamName={team.teamName}
            teamLeaderIntraId={team.teamLeaderIntraId}
            teamMateCount={team.teamMateCount}
            maxMateCount={agendaData.agendaMaxPeople}
          />
        ))}
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          확정완료 팀 {confirmedTeams.length} / {agendaData.agendaMaxTeam}
        </div>
        {confirmedTeams.map((team) => (
          <ParticipantTeam
            key={team.teamKey}
            teamKey={team.teamKey}
            teamName={team.teamName}
            teamLeaderIntraId={team.teamLeaderIntraId}
            teamMateCount={team.teamMateCount}
            maxMateCount={agendaData.agendaMaxPeople}
          />
        ))}
      </div>
    </>
  );
}
