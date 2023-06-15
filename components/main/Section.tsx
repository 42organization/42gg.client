import React from 'react';
import { useRouter } from 'next/router';
import { FaChevronRight } from 'react-icons/fa';
import GameResult from 'components/game/GameResult';
import RankList from 'components/rank/RankList';
import styles from 'styles/main/Section.module.scss';

type SectionProps = {
  sectionTitle: string;
  path: string;
};

type pathType = Record<string, JSX.Element>;

export default function Section({ sectionTitle, path }: SectionProps) {
  const router = useRouter();
  const pathCheck: pathType = {
    game: <GameResult />,
    rank: <RankList toggleMode={'RANK'} isMain={true} />,
  };

  return (
    <div className={styles['sectionWrap']}>
      <div className={styles['titleWrap']}>
        <span>{sectionTitle}</span>
        <button onClick={() => router.push(`/${path}`)}>
          <FaChevronRight />
        </button>
      </div>
      <section>{pathCheck[path]}</section>
    </div>
  );
}
