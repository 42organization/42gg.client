import Link from 'next/link';
import { Game } from '../../types/gameTypes';
import { Rank } from '../../types/rankTypes';
import RankItem from '../rank/RankItem';
import styles from '../../styles/Section.module.scss';

type SectionProps = {
  gameData?: Game[];
  rankData?: Rank[];
  path: string;
};

export default function Section({ gameData, rankData, path }: SectionProps) {
  return (
    <div className={styles.sectionWrap}>
      <Link href={path}>
        <a>더보기 &#9657;</a>
      </Link>
      {gameData ? (
        <section>{/* kipark의 게임 리스트 */}</section>
      ) : (
        <section>
          <div id={styles.title}>Winner</div>
          {rankData?.map((item) => (
            <RankItem key={item.userId} user={item} />
          ))}
        </section>
      )}
    </div>
  );
}
