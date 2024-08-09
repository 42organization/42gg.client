import { useRouter } from 'next/router';
import {
  numberProps,
  ParticipantProps,
} from 'types/agenda/agendaDetail/tabs/participantTypes';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantsList.module.scss';

export default function ParticipantsList({ max }: numberProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  // const { participants, curPeople } = useParticipant(agendaKey as string);
  const params = { agenda_key: agendaKey, page: 1, size: 10 };
  const participants = useFetchGet<ParticipantProps[]>(
    `team/open/list`,
    params
  ).data;

  const curPeople = participants ? participants.length : 0;
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
