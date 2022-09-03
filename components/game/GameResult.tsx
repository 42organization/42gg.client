import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Mode } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import GameResultList from 'components/game/GameResultList';

interface GameResultProps {
  intraId?: string;
  mode?: Mode;
  season?: string;
  isMine?: boolean;
}

export default function GameResult({
  intraId,
  mode,
  season,
  isMine,
}: GameResultProps) {
  const queryClient = new QueryClient();
  const myIntraId = useRecoilValue(userState).intraId;
  const [path, setPath] = useState('');
  const router = useRouter();

  const makePath = () => {
    if (router.asPath === '/' || router.asPath.includes('token')) {
      setPath(`/pingpong/games?count=3&gameId=`);
      return;
    }
    const userOption = isMine
      ? `/users/${myIntraId}`
      : intraId
      ? `/users/${intraId}`
      : '';
    const seasonOption = mode === 'rank' ? `season=${season}` : '';
    const modeOption =
      mode === 'rank' ? 'mode=rank' : mode === 'normal' ? 'mode=normal' : '';
    const countOption = intraId ? 'count=5' : '';
    const query = [modeOption, seasonOption, countOption, 'gameId=']
      .filter((item) => item !== '')
      .join('&');
    setPath(`/pingpong${userOption}/games?${query}`);
    return;
  };

  useEffect(() => {
    makePath();
  }, [router.asPath, mode, season, isMine]);

  return (
    <div>
      {path && (
        <QueryClientProvider client={queryClient}>
          <GameResultList path={path} />
        </QueryClientProvider>
      )}
    </div>
  );
}
