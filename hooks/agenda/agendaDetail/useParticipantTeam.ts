import { useEffect, useState } from 'react';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { instanceInAgenda } from 'utils/axios';

const teamData = [
  {
    teamKey: 'team1111',
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 4,
    coalitions: ['GUN', 'GON', 'GAM', 'GUN'],
  },
  {
    teamKey: 'team2222',
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 2,
    coalitions: ['GUN', 'GON'],
  },
];

const useOpenTeams = (agendaKey: string) => {
  const [openTeams, setOpenTeams] = useState<TeamDataProps[] | null>([]);

  useEffect(() => {
    const fetchOpenTeams = async () => {
      if (agendaKey) {
        try {
          const params = {
            agenda_key: agendaKey,
            page: 1,
            size: 10,
          };
          const res = await instanceInAgenda.get('team/open/list', {
            params,
          });

          setOpenTeams(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // fetchOpenTeam();
    setOpenTeams(teamData);
  }, [agendaKey]);

  return openTeams;
};

const confirmData = [
  {
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 6,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON', 'GAM', 'LEE', 'GUN', 'GON'],
  },
  {
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 3,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON', 'GON'],
  },
  {
    teamName: 'team3333',
    teamLeaderIntraId: 'leader',
    teamMateCount: 1,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN'],
  },
];
const useConfirmedTeams = (agendaKey: string) => {
  const [confirmedTeams, setConfirmedTeams] = useState<TeamDataProps[] | null>(
    []
  );

  useEffect(() => {
    const fetchConfrimedTeams = async () => {
      if (agendaKey) {
        try {
          const params = {
            agenda_key: agendaKey,
            page: 1,
            size: 10,
          };
          const res = await instanceInAgenda.get('team/confirm/list', {
            params,
          });

          setConfirmedTeams(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // fetchConfrimTeam();
    setConfirmedTeams(confirmData);
  }, [agendaKey]);

  return confirmedTeams;
};

export { useOpenTeams, useConfirmedTeams };
