import { useRouter } from 'next/router';
import { numberProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import useParticipant from 'hooks/agenda/agendaDetail/useParticipant';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantsList.module.scss';

export default function ParticipantsList({ max }: numberProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const { participants, curPeople } = useParticipant(agendaKey as string);
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
