import MyRank from '../components/rank/MyRank';
import RankList from '../components/rank/RankList';

export default function Rank() {
  return (
    <div>
      <MyRank />
      <RankList isMain={false} />
    </div>
  );
}
