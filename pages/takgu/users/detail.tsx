import { useRouter } from 'next/router';
import { RandomColors } from 'types/colorModeTypes';
import GameResult from 'components/takgu/game/GameResult';
import Section from 'components/takgu/main/Section';
import BasicProfile from 'components/takgu/user/BasicProfile';
import RankProfile from 'components/takgu/user/RankProfile';
import useBasicProfile from 'hooks/takgu/users/useBasicProfile';
import useProfileColorMode from 'hooks/takgu/users/useProfileColorMode';
import styles from 'styles/user/user.module.scss';

export default function User() {
  const router = useRouter();
  const { intraId } = router.query;
  const { background } = useBasicProfile({ profileId: intraId as string });

  useProfileColorMode(background as RandomColors);
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
