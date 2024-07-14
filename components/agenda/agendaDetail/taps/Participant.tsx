import React from 'react';
import { Coalition } from 'constants/agenda/coalition';
import CoalitionGam from 'public/image/agenda/coalition/seoul-gam.svg';
import CoalitionGon from 'public/image/agenda/coalition/seoul-gon.svg';
import CoalitionGun from 'public/image/agenda/coalition/seoul-gun.svg';
import CoalitionLee from 'public/image/agenda/coalition/seoul-lee.svg';
import styles from 'styles/agenda/agendaDetail/taps/Participant.module.scss';

interface ParticipantProps {
  name: string;
  iconType: Coalition;
}

const iconMap = {
  [Coalition.GAM]: CoalitionGam,
  [Coalition.GON]: CoalitionGon,
  [Coalition.GUN]: CoalitionGun,
  [Coalition.LEE]: CoalitionLee,
  [Coalition.SPRING]: null,
  [Coalition.SUMMER]: null,
  [Coalition.AUTUMN]: null,
  [Coalition.WINTER]: null,
  [Coalition.OTHER]: null,
};

export default function Participant({ name, iconType }: ParticipantProps) {
  const IconComponent = iconMap[iconType];

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.participantWarp}>
        <div className={styles.participantcontent}>{name}</div>
        <IconComponent />
      </div>
    </div>
  );
}
