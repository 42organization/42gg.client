import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  numberProps,
  ParticipantProps,
} from 'types/agenda/agendaDetail/tabs/participantTypes';
import { instanceInAgenda } from 'utils/axios';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantsList.module.scss';

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

export default function ParticipantsList({ max }: numberProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [participants, setParticipants] = useState<ParticipantProps[] | null>(
    null
  );
  const [curPeople, setCurPeople] = useState(0);

  const fetchParticipants = async () => {
    // /agenda/team/confirm/list?agenda_id=agenda_id
    if (agendaKey) {
      try {
        console.log(agendaKey);
        const res = await instanceInAgenda.get(
          `team/confirm?agenda_key=${agendaKey}`
        );
        console.log(res.data);
        setParticipants(res.data);
        setCurPeople(res.data.length);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    // fetchParticipants();
    setParticipants(mockParticipant);
    setCurPeople(mockParticipant.length);
  }, [agendaKey]);

  if (!participants) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.participantsTitle}>
        참여자 {curPeople} / {max}
      </div>
      <div className={styles.ListContainer}>
        {participants.map((participant, index) => (
          <Participant
            key={index}
            teamName={participant.teamName}
            coalitions={participant.coalitions}
          />
        ))}
      </div>
    </>
  );
}
