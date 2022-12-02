import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Opponent } from 'types/matchTypes';
import styles from '/styles/modal/MatchChallengeCard.module.scss';

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
  const { intraId, nick, imageUrl, detail } = opponent;
  const selectHandler = () => {
    setSelectedOpponent(opponent);
  };

  return (
    <div
      className={`${styles.opponentCard} ${
        selectedOpponent && intraId === selectedOpponent.intraId
          ? styles.isSelected
          : ''
      }`}
      onClick={selectHandler}
    >
      <div className={styles.imageIdWrap}>
        <div className={styles.userImage}>
          <Image src={imageUrl} layout={'fill'}></Image>
        </div>
        <div className={styles.intraId}>{intraId}</div>
      </div>
      <div className={styles.nickDetailWrap}>
        <div className={styles.nick}>{nick}</div>
        <div className={styles.detail}>
          {detail.map((detail, index) => {
            return <li key={index}>• {detail}</li>;
          })}
        </div>
      </div>
    </div>
  );
}
