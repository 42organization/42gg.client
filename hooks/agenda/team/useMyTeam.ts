import { useEffect, useState } from 'react';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { instanceInAgenda } from 'utils/axios';

const getIsParticipant = (teamList: number) => {
  return teamList === 200;
};

export const useMyTeam = (agendaKey: string) => {
  const [myTeam, setMyTeam] = useState<TeamDataProps | null>(null);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyTeam = async () => {
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get(
            `team/my?agenda_key=${agendaKey}`
          );
          setIsParticipant(getIsParticipant(res.status));
          if (res.status === 200) {
            setMyTeam(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMyTeam();
  }, [agendaKey]);

  return { myTeam, isParticipant };
};
