import { useRouter } from 'next/router';
import Profile from 'components/user/Profile';
import GameResult from 'components/game/GameResult';
import styles from 'styles/user/user.module.scss';
import RankProfile from 'components/user/RankProfile';

export default function user() {
  const router = useRouter();
  const { intraId } = router.query;

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <Profile intraId={intraId} />
          <RankProfile intraId={intraId} />
          <GameResult intraId={intraId} />
        </>
      )}
    </div>
  );
}
