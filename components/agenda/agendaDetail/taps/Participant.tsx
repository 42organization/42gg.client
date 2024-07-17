import React from 'react';
import { Coalition } from 'constants/agenda/coalition';
import CoalitionDefault from 'public/image/agenda/coalition/coalition-default.svg';
import CoalitionAutumn from 'public/image/agenda/coalition/gyeongsan-autumn.svg';
import CoalitionSpring from 'public/image/agenda/coalition/gyeongsan-spring.svg';
import CoalitionSummer from 'public/image/agenda/coalition/gyeongsan-summer.svg';
import CoalitionWinter from 'public/image/agenda/coalition/gyeongsan-winter.svg';
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
  [Coalition.SPRING]: CoalitionSpring,
  [Coalition.SUMMER]: CoalitionSummer,
  [Coalition.AUTUMN]: CoalitionAutumn,
  [Coalition.WINTER]: CoalitionWinter,
  [Coalition.OTHER]: CoalitionDefault,
};

const bgClassMap = {
  [Coalition.GUN]: styles.bgGun,
  [Coalition.GON]: styles.bgGon,
  [Coalition.GAM]: styles.bgGam,
  [Coalition.LEE]: styles.bgLee,
  [Coalition.SPRING]: styles.bgSpring,
  [Coalition.SUMMER]: styles.bgSummer,
  [Coalition.AUTUMN]: styles.bgAutumn,
  [Coalition.WINTER]: styles.bgWinter,
  [Coalition.OTHER]: styles.bgDefault,
};

export default function Participant({ name, iconType }: ParticipantProps) {
  const IconComponent = iconMap[iconType];
  const bgClass = bgClassMap[iconType];

  return (
    <div className={`${styles.participantsContainer} ${bgClass}`}>
      <div className={styles.participantWarp}>
        <div className={styles.participantcontent}>{name}</div>
        <IconComponent />
      </div>
    </div>
  );
}
