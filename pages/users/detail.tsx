import { useRouter } from 'next/router';
import BasicProfile from 'components/user/BasicProfile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import styles from 'styles/user/user.module.scss';

export default function user() {
  const router = useRouter();
  const { intraId } = router.query;

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <BasicProfile intraId={intraId} />
          <RankProfile intraId={intraId} />
          <h2 className={styles.subtitle}>recent record</h2>
          <GameResult intraId={intraId} />
        </>
      )}
    </div>
  );
}
