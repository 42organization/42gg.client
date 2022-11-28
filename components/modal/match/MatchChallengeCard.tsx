import styles from '/styles/modal/MatchChallengeCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface Opponent {
  intraId: string;
  nick: string;
  imageUrl: StaticImageData;
  detail: string;
}

interface MatchChallengeCardProps {
  opponent: Opponent;
  selectedOpponent: Opponent | null;
  setSelectedOpponent: Dispatch<SetStateAction<Opponent | null>>;
}

export default function MatchChallengeCard({
  opponent,
  selectedOpponent,
  setSelectedOpponent,
}: MatchChallengeCardProps) {
  const selectHandler = () => {
    setSelectedOpponent(opponent);
  };
  console.log('selected oppo :', selectedOpponent);
  console.log('opponent', opponent);
  return (
    <div
      className={`${styles.opponentCard} ${
        selectedOpponent && opponent.intraId === selectedOpponent.intraId
          ? styles.isSelected
          : ''
      }`}
      onClick={selectHandler}
    >
      <span className={styles.userImage}>
        <Image src={opponent.imageUrl} layout={'fill'}></Image>
      </span>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>
          <span className={styles.intraId}>{opponent.intraId}</span>
          <span className={styles.nick}>{opponent.nick}</span>
        </div>
        <div className={styles.detail}>{opponent.detail}</div>
      </div>
    </div>
  );
}
