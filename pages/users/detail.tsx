import Link from 'next/link';
import { useRouter } from 'next/router';
import BasicProfile from 'components/user/BasicProfile';
import GameResult from 'components/game/GameResult';
import RankProfile from 'components/user/RankProfile';
import styles from 'styles/user/user.module.scss';
import Section from 'components/main/Section';

import { FaChevronRight } from 'react-icons/fa';

export default function User() {
  const router = useRouter();
  const { intraId } = router.query;

  return (
    <div className={styles.container}>
      {typeof intraId === 'string' && (
        <div key={intraId}>
          <BasicProfile profileId={intraId} />
          <RankProfile profileId={intraId} />
          <div className={styles['sectionWrap']}>
            <div className={styles['titleWrap']}>
              <span>Recent Record</span>
              <Link
                href={{
                  pathname: '/game',
                  query: { intraId: intraId },
                }}
              >
                <FaChevronRight color='white' size='13' />
              </Link>
            </div>
          </div>
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
