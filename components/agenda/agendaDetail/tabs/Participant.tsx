import React from 'react';
import { colorMapping, iconMapping } from 'types/agenda/utils/colorList';
import { Coalition, coalitionValues } from 'constants/agenda/agenda';
import styles from 'styles/agenda/agendaDetail/tabs/Participant.module.scss';

interface ParticipantProps {
  name: string;
  coalitions: string[] | Coalition[];
}

// string 또는 Coalition enum을 인자로 받아 해당하는 enum 값을 리턴하는 함수
function getCoalitionEnum(input: string[] | Coalition[]) {
  return input.map((item) => {
    if (typeof item === 'string') {
      if (coalitionValues.includes(item as Coalition)) {
        return item as Coalition;
      }
    } else if (coalitionValues.includes(item)) {
      return item;
    }
    // return undefined; // 일치하는 값이 없을 경우 undefined 반환
  });
}

export default function Participant({ name, coalitions }: ParticipantProps) {
  const coalitionEnum = getCoalitionEnum(coalitions);

  // 유효성 검사: coalitionEnum이 undefined이거나, 어떤 값이 undefined인 경우
  if (!coalitionEnum || !coalitionEnum[0] || coalitionEnum.length !== 1) {
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
