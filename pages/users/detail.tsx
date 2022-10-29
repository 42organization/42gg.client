import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import BasicProfile from 'components/user/BasicProfile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import styles from 'styles/user/user.module.scss';

export default function user() {
  const router = useRouter();
  const myIntraId = useRecoilValue(userState).intraId;
  const { intraId } = router.query;

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <BasicProfile intraId={intraId} />
          <RankProfile intraId={intraId} />
          {intraId === myIntraId ? (
            <Link
              href={{
                pathname: '/game',
                query: { intraId: intraId, fromMine: true },
              }}
              as={'/game'}
            >
              <h2 id={styles.mine} className={styles.subtitle}>
                recent record ▶️
              </h2>
            </Link>
          ) : (
            <h2 className={styles.subtitle}>recent record</h2>
          )}
          <GameResult />
        </>
      )}
    </div>
  );
}
