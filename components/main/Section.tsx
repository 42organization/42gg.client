import Link from 'next/link';
import GameResult from 'components/game/GameResult';
import RankList from 'components/rank/RankList';
import styles from 'styles/main/Section.module.scss';

type SectionProps = {
  path: string;
};

export default function Section({ path }: SectionProps) {
  return (
    <div className={styles.sectionWrap}>
      <Link href={path}>
        <a>더보기 &#9657;</a>
      </Link>
      <section>{sectionRouter(path)}</section>
    </div>
  );
}

function sectionRouter(path: string) {
  switch (path) {
    case '/game':
      return <GameResult />;
    case '/rank':
      return <RankList mode={'rank'} />;
  }
}
