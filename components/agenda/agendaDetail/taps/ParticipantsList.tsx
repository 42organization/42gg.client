import React from 'react';
import { Coalition } from 'constants/agenda/agenda';
import Participant from 'components/agenda/agendaDetail/taps/Participant';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantsList.module.scss';

export default function ParticipantsList() {
  const curPeople = 1;
  const maxPeople = 4;

  const participants = [
    { name: 'intraId1', iconType: Coalition.GUN },
    { name: 'intraId2', iconType: Coalition.GAM },
    { name: 'intraId3', iconType: Coalition.GON },
    { name: 'intraId4', iconType: Coalition.LEE },
    { name: 'intraId5', iconType: Coalition.SPRING },
    { name: 'intraId6', iconType: Coalition.SUMMER },
    { name: 'intraId7', iconType: Coalition.AUTUMN },
    { name: 'intraId8', iconType: Coalition.WINTER },
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
            iconType={participant.iconType}
          />
        ))}
      </div>
    </>
  );
}
