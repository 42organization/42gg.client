import { useRouter } from 'next/router';
import { RandomColors } from 'types/colorModeTypes';
import GameResult from 'components/game/GameResult';
import Section from 'components/main/Section';
import BasicProfile from 'components/user/BasicProfile';
import RankProfile from 'components/user/RankProfile';
import useBasicProfile from 'hooks/users/useBasicProfile';
import useProfileColorMode from 'hooks/users/useProfileColorMode';
import styles from 'styles/user/user.module.scss';

export default function User() {
  const router = useRouter();
  const { intraId } = router.query;
  const { backgroundType } = useBasicProfile({ profileId: intraId as string });

  useProfileColorMode(backgroundType as RandomColors);
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
