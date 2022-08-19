import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import Profile from 'components/user/Profile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import styles from 'styles/user/user.module.scss';

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
          <RankProfile intraId={intraId} />
          <h2 className={styles.subtitle}>recent record</h2>
          <GameResult intraId={intraId} />
        </>
      )}
    </div>
  );
}
