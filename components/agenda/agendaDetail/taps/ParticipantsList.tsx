import React from 'react';
import { Coalition } from 'constants/agenda/agenda';
import Participant from 'components/agenda/agendaDetail/taps/Participant';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantsList.module.scss';

interface ParticipantsListProps {
  participants: { name: string; iconType: Coalition }[];
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  const curPeople = 1;
  const maxPeople = 4;

  return (
    <>
      <div className={styles.participantsTitle}>
        참가자 {curPeople} / {maxPeople}
      </div>
      <div className={styles.ListContainer}>
        {participants.map((participant, index) => (
          <Participant
            key={index}
            name={participant.name}
            iconType={participant.iconType}
          />
        ))}
      </div>
    </>
  );
}
