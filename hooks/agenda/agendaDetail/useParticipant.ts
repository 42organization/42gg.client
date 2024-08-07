import { useEffect, useState } from 'react';
import { ParticipantProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { instanceInAgenda } from 'utils/axios';

const mockParticipant = [
  {
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 1,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN'],
  },
  {
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 1,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GON'],
  },
];

const useParticipant = (agendaKey: string) => {
  const [participants, setParticipants] = useState<ParticipantProps[] | null>(
    null
  );
  const [curPeople, setCurPeople] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      // /agenda/team/confirm/list?agenda_id=agenda_id
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get(
            `team/confirm?agenda_key=${agendaKey}`
          );
          setParticipants(res.data);
          setCurPeople(res.data.length);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // fetchParticipants();
    setParticipants(mockParticipant);
    setCurPeople(mockParticipant.length);
  }, [agendaKey]);

  return { participants, curPeople };
};

export default useParticipant;
