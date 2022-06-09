import Link from 'next/link';
import styles from '../../styles/Section.module.scss';
import GameResultList from '../game/GameResultList';
import RankList from '../rank/RankList';

type SectionProps = {
  path: string;
};

export default function Section({ path }: SectionProps) {
  return (
    <div className={styles.sectionWrap}>
      <Link href={path}>
        <a>더보기 &#9657;</a>
      </Link>
      <section>
        {/* {path === '/game' ? (
          <GameResultList count={3} />
        ) : (
          <RankList count={3} />
        )}
				kipark, daekim 수정 후 사용 예정 */}
      </section>
    </div>
  );
}
