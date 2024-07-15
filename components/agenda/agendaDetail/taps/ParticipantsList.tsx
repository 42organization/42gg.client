import React from 'react';
import { Coalition } from 'constants/agenda/coalition';
import Participant from 'components/agenda/agendaDetail/taps/Participant';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantsList.module.scss';

interface ParticipantsListProps {
  participants: { name: string; iconType: Coalition }[];
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  return (
    <div className={styles.ListContainer}>
      {participants.map((participant, index) => (
        <Participant
          key={index}
          name={participant.name}
          iconType={participant.iconType}
        />
      ))}
    </div>
  );
}
