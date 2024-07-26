import React from 'react';
import { colorMapping, iconMapping } from 'types/agenda/utils/colorList';
import { Coalition } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/tabs/Participant.module.scss';

interface ParticipantProps {
  name: string;
  coalition: Coalition;
}

export default function Participant({ name, coalition }: ParticipantProps) {
  const IconComponent = iconMapping[coalition];

  return (
    <div
      className={`${styles.participantsContainer} ${colorMapping[coalition]}`}
    >
      <div className={styles.participantWarp}>
        <div className={styles.participantcontent}>{name}</div>
        <IconComponent />
      </div>
    </div>
  );
}
