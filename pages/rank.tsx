import { useEffect, useState } from 'react';
import { RankData } from '../types/rankTypes';
import { getData } from '../utils/axios';
import MyRank from '../components/rank/MyRank';
import RankList from '../components/rank/RankList';

export default function Rank() {
  const [rankData, setRankData] = useState<RankData | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/ranks/${1}?count=20`);
        setRankData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (rankData) {
    const { myRank, rankList } = rankData;
    return (
      <div>
        <MyRank myRank={myRank} />
        <RankList rankList={rankList} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
