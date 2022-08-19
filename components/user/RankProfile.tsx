import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import Chart from 'components/user/Chart';
import SeasonProvider from 'components/mode/SeasonProvider';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import { RankProfileInfo } from 'types/userTypes';
import styles from 'styles/user/Profile.module.scss';

interface RankProfileProps {
  intraId: string;
}

interface RankProps {
  intraId: string;
  season?: string;
}

export default function RankProfile({ intraId }: RankProfileProps) {
  return (
    <div className={styles.container}>
      <SeasonProvider>
        <RankInfo intraId={intraId} />
      </SeasonProvider>
    </div>
  );
}

function RankInfo({ intraId, season }: RankProps) {
  const setErrorMessage = useSetRecoilState(errorState);
  const [rankProfileInfo, setRankProfileInfo] = useState<RankProfileInfo>({
    rank: 0,
    ppp: 0,
    wins: 0,
    losses: 0,
    winRate: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(
          `/pingpong/users/${intraId}/rank/${season}`
        );
        setRankProfileInfo(res?.data);
      } catch (e) {
        setErrorMessage('');
      }
    })();
  }, [intraId, season]);

  const { rank, ppp, wins, losses, winRate } = rankProfileInfo;

  return (
    <div>
      <div className={styles.rankInfo}>
        <div className={styles.rank}>
          <span>RANK</span>
          <span>6</span>
          {/* <span>{rank}</span> */}
        </div>
        <div className={styles.pppWinRateWrap}>
          <div className={styles.ppp}>1200점</div>
          <div className={styles.winRate}>승률 68% (14승 6패)</div>
          {/* <div className={styles.ppp}>{ppp}점</div>
          <div className={styles.winRate}>승률 {winRate}% ({wins}승 {losses}패)</div> */}
        </div>
        <div className={styles.bar}>
          <span className={styles.wins} style={{ width: '60%' }}></span>
          <span className={styles.losses} style={{ width: '40%' }}></span>
          {/* <span
            className={styles.wins}
            style={{ width: `${parseInt(winRate)}%` }}
          ></span>
          <span
            className={styles.losses}
            style={{ width: `${100 - parseInt(winRate)}` }}
          ></span> */}
        </div>
      </div>
      <Chart intraId={intraId} />
    </div>
  );
}
