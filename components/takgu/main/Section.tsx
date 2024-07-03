import { useRouter } from 'next/router';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import GameResult from 'components/takgu/game/GameResult';
import TournamentPreview from 'components/takgu/main/TournamentPreview';
import RankListMain from 'components/takgu/rank/topRank/RankListMain';
import styles from 'styles/main/Section.module.scss';
import PartyPreview from './PartyPreview';

type SectionProps = {
  sectionTitle: string;
  path: string;
};

type pathType = Record<string, JSX.Element>;

export default function Section({ sectionTitle, path }: SectionProps) {
  const router = useRouter();
  const pathCheck: pathType = {
    game: <GameResult />,
    rank: <RankListMain isMain={true} season={0} />,
    party: <PartyPreview />,
    tournament: <TournamentPreview />,
  };

  return (
    <div
      className={`${styles['sectionWrap']} ${
        path === 'rank' ? styles['mainRank'] : styles['sectionWrap']
      }`}
    >
      <div className={styles['titleWrap']}>
        <span>{sectionTitle}</span>
        <button onClick={() => router.push(`/takgu/${path}`)}>
          <FaChevronRight />
        </button>
      </div>
      <section>{pathCheck[path]}</section>
    </div>
  );
}
