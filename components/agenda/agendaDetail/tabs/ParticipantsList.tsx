import React from 'react';
import { Coalition } from 'constants/agenda/agenda';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantsList.module.scss';

export default function ParticipantsList() {
  const curPeople = 1;
  const maxPeople = 4;

  const participants = [
    { name: 'intraId1', coalition: Coalition.GUN },
    { name: 'intraId2', coalition: Coalition.GAM },
    { name: 'intraId3', coalition: Coalition.GON },
    { name: 'intraId4', coalition: Coalition.LEE },
    { name: 'intraId5', coalition: Coalition.SPRING },
    { name: 'intraId6', coalition: Coalition.SUMMER },
    { name: 'intraId7', coalition: Coalition.AUTUMN },
    { name: 'intraId8', coalition: Coalition.WINTER },
  ];

  return (
    <>
      <div className={styles.participantsTitle}>
        참여자 {curPeople} / {maxPeople}
      </div>
      <div className={styles.ListContainer}>
        {participants.map((participant, index) => (
          <Participant
            key={index}
            name={participant.name}
            coalition={participant.coalition}
          />
        ))}
      </div>
    </>
  );
}
