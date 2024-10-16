import ProfileModeWrap from 'components/takgu/mode/modeWraps/ProfileModeWrap';
import ProfileChart from 'components/takgu/user/ProfileChart';
import useGetRankProfile from 'hooks/takgu/users/useGetRankProfile';
import styles from 'styles/takgu/user/ProfileRank.module.scss';

interface RankProfileProps {
  profileId: string;
}

interface ProfileProps {
  profileId: string;
  season?: number;
}

export default function RankProfile({ profileId }: RankProfileProps) {
  return (
    <div className={styles.container}>
      <ProfileModeWrap>
        <Profile profileId={profileId} />
      </ProfileModeWrap>
    </div>
  );
}

function Profile({ profileId, season }: ProfileProps) {
  const rankProfile = useGetRankProfile(profileId, season);

  const { rank, ppp, wins, losses, winRate } = rankProfile;

  return (
    <div>
      <div className={styles.rankInfo}>
        <div className={styles.rank}>
          <span>RANK</span>
          <span>{rank === -1 ? ' -' : rank}</span>
        </div>
        <div className={styles.pppWinRateWrap}>
          <div className={styles.ppp}>{rank === -1 ? 'NONE' : ppp + '점'}</div>
          <div className={styles.winRate}>
            승률 {winRate}% ({wins}승 {losses}패)
          </div>
        </div>
        <div className={styles.bar}>
          <span
            className={styles.wins}
            style={{ width: `${parseInt(winRate)}%` }}
          ></span>
          <span
            className={styles.losses}
            style={{ width: `${100 - parseInt(winRate)}%` }}
          ></span>
        </div>
      </div>
      <ProfileChart profileId={profileId} season={season} />
    </div>
  );
}
