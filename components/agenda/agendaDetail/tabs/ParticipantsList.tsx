import { useRouter } from 'next/router';
import {
  numberProps,
  ParticipantProps,
} from 'types/agenda/agendaDetail/tabs/participantTypes';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantsList.module.scss';

export default function ParticipantsList({ max }: numberProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const { content: participants, PagaNationElementProps } =
    usePageNation<ParticipantProps>({
      url: `team/confirm/list`,
      params: { agenda_key: agendaKey },
    });

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
        <PageNation {...PagaNationElementProps} />
      </div>
    </>
  );
}
