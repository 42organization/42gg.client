import MyRank from '../components/rank/MyRank';
import RankList from '../components/rank/RankList';
import { useRecoilValue } from 'recoil';
import { userState } from '../utils/recoil/main';
// import { QueryClient, QueryClientProvider } from 'react-query';

export default function Rank() {
  // const queryClient = new QueryClient();

  return (
    <div>
      <MyRank />
      <RankList isMain={false} />
    </div>
  );
}
