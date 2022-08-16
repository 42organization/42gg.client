import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import Chart from 'components/user/Chart';
import Profile from 'components/user/Profile';
import GameResult from 'components/game/GameResult';
import styles from 'styles/user/user.module.scss';
import { useEffect } from 'react';
import SeasonProvider from 'components/mode/SeasonProvider';

export default function user() {
  const setModalInfo = useSetRecoilState(modalState);
  const router = useRouter();
  const { intraId } = router.query;

  useEffect(() => {
    return () => setModalInfo({ modalName: null });
  }, []);

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <>
          <h1 className={styles.title}>{intraId}</h1>
          <Profile intraId={intraId} />
          <SeasonProvider>
            <Chart intraId={intraId} />
          </SeasonProvider>
          <GameResult intraId={intraId} />
        </>
      )}
    </div>
  );
}
