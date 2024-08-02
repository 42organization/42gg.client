import React from 'react';
import { colorMapping, iconMapping } from 'types/agenda/utils/colorList';
import { Coalition } from 'constants/agenda/agenda';
import { getCoalitionEnum } from 'components/agenda/utils/coalition/getCoalitionEnum';
import styles from 'styles/agenda/agendaDetail/tabs/Participant.module.scss';

interface ParticipantProps {
  name: string;
  coalitions: string[] | Coalition[];
}

export default function Participant({ name, coalitions }: ParticipantProps) {
  const coalitionEnum = getCoalitionEnum(coalitions);

  if (!coalitionEnum || coalitionEnum.length !== 1) {
    console.error('유효하지 않은 coalition 값입니다.');
    return null;
  }

  const IconComponent = iconMapping[coalitionEnum[0]];

  return (
    <div
      className={`${styles.participantsContainer} ${
        colorMapping[coalitionEnum[0]]
      }`}
    >
      <div className={styles.participantWarp}>
        <div className={styles.participantcontent}>{name}</div>
        {IconComponent && <IconComponent />}
      </div>
    </div>
  );
}
