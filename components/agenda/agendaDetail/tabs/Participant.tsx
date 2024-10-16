import Link from 'next/link';
import React from 'react';
import { ParticipantProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { colorMapping, iconMapping } from 'types/agenda/utils/colorList';
import { getCoalitionEnum } from 'components/agenda/utils/coalition/getCoalitionEnum';
import styles from 'styles/agenda/agendaDetail/tabs/Participant.module.scss';

export default function Participant({
  teamName,
  coalitions,
}: ParticipantProps) {
  const coalitionEnum = getCoalitionEnum(coalitions);

  if (!coalitionEnum || coalitionEnum.length !== 1) {
    console.error('유효하지 않은 coalition 값입니다.');
    return null;
  }

  const IconComponent = iconMapping[coalitionEnum[0]];

  return (
    <Link href={`/agenda/profile/user?id=${teamName}`}>
      <div
        className={`${styles.participantItem} ${
          colorMapping[coalitionEnum[0]]
        }`}
      >
        <div className={styles.participantItemWarp}>
          <div className={styles.participantcontent}>{teamName}</div>
          {IconComponent ? <IconComponent /> : ''}
        </div>
      </div>
    </Link>
  );
}
