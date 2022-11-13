import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProfileRank } from 'types/userTypes';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import ProfileChart from 'components/user/ProfileChart';
import ProfileModeWrap from 'components/mode/modeWraps/ProfileModeWrap';
import styles from 'styles/user/Profile.module.scss';

interface RankProfileProps {
  intraId: string;
}

interface RankProps {
  intraId: string;
  season?: number;
}

export default function RankProfile({ intraId }: RankProfileProps) {
  return (
    <div className={styles.container}>
      <ProfileModeWrap>
        <Profile intraId={intraId} />
      </ProfileModeWrap>
    </div>
  );
}

function Profile({ intraId, season }: RankProps) {
  const setError = useSetRecoilState(errorState);
  const [rankProfile, setRankProfile] = useState<ProfileRank>({
    rank: 0,
    ppp: 0,
    wins: 0,
    losses: 0,
    winRate: '',
  });

  useEffect(() => {
    getRankProfileHandler();
  }, [season]);

  const getRankProfileHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/users/${intraId}/rank?season=${season}`
      );
      setRankProfile(res?.data);
    } catch (e) {
      setError('JH07');
    }
  };

  const { rank, ppp, wins, losses, winRate } = rankProfile;

  return (
    <div>
      <div className={styles.rankInfo}>
        <div className={styles.rank}>
          <span>RANK</span>
          <span>{rank}</span>
        </div>
        <div className={styles.pppWinRateWrap}>
          <div className={styles.ppp}>{ppp}점</div>
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
      <ProfileChart intraId={intraId} season={season} />
    </div>
  );
}
