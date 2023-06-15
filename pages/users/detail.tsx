import Link from 'next/link';
import { useRouter } from 'next/router';
import BasicProfile from 'components/user/BasicProfile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import styles from 'styles/user/user.module.scss';

export default function User() {
  const router = useRouter();
  const { intraId } = router.query;

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <div key={intraId}>
          <BasicProfile profileId={intraId} />
          <RankProfile profileId={intraId} />
          <Link
            href={{
              pathname: '/game',
              query: { intraId: intraId },
            }}
          >
            <h2 id={styles.mine} className={styles.subtitle}>
              recent record ▶️
            </h2>
          </Link>
          <GameResult />
        </div>
      )}
    </div>
  );
}
