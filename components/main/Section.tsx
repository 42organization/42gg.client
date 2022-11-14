import Link from 'next/link';
import React from 'react';
import GameResult from 'components/game/GameResult';
import RankList from 'components/rank/RankList';
import styles from 'styles/main/Section.module.scss';

type SectionProps = {
  path: string;
};

type pathType = {
  [key: string]: JSX.Element;
};

export default function Section({ path }: SectionProps) {
  const pathCheck: pathType = {
    game: <GameResult />,
    rank: <RankList toggleMode={'rank'} isMain={true} />,
  };

  return (
    <div className={styles.sectionWrap}>
      <Link href={`/${path}`}>
        <a>더보기 &#9657;</a>
      </Link>
      <section>{pathCheck[path]}</section>
    </div>
  );
}
