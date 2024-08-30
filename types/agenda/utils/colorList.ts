import { Coalition } from 'constants/agenda/agenda';
import CoalitionDefault from 'public/image/agenda/coalition/coalition-default.svg';
import CoalitionAutumn from 'public/image/agenda/coalition/gyeongsan-autumn.svg';
import CoalitionSpring from 'public/image/agenda/coalition/gyeongsan-spring.svg';
import CoalitionSummer from 'public/image/agenda/coalition/gyeongsan-summer.svg';
import CoalitionWinter from 'public/image/agenda/coalition/gyeongsan-winter.svg';
import CoalitionGam from 'public/image/agenda/coalition/seoul-gam.svg';
import CoalitionGon from 'public/image/agenda/coalition/seoul-gon.svg';
import CoalitionGun from 'public/image/agenda/coalition/seoul-gun.svg';
import CoalitionLee from 'public/image/agenda/coalition/seoul-lee.svg';
import styles from 'styles/agenda/utils/coalitionColor.module.scss';

export interface ColorMapping {
  [key: string]: string;
}

export const colorMapping: ColorMapping = {
  [Coalition.GUN]: styles.colorGun,
  [Coalition.GON]: styles.colorGon,
  [Coalition.GAM]: styles.colorGam,
  [Coalition.LEE]: styles.colorLee,
  [Coalition.SPRING]: styles.colorSpring,
  [Coalition.SUMMER]: styles.colorSummer,
  [Coalition.AUTUMN]: styles.colorAutumn,
  [Coalition.WINTER]: styles.colorWinter,
  [Coalition.OTHER]: styles.colorDefault,
};

export interface ColorListProps {
  peopleCount: {
    [key: string]: number;
  };
  totalPeople: number;
}

export const iconMapping = {
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
