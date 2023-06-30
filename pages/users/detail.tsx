import { useRouter } from 'next/router';
import BasicProfile from 'components/user/BasicProfile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import Section from 'components/main/Section';
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
          <div>
            <Section
              path={`game?intraId=${intraId}`}
              sectionTitle={'Recent Record'}
            />
          </div>
          <GameResult />
        </div>
      )}
    </div>
  );
}
