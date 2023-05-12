import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SeasonMode } from 'types/mainType';

interface GameResultProps {
  mode?: SeasonMode;
  season?: number;
}

const useGameResult = ({ mode, season }: GameResultProps) => {
  const [path, setPath] = useState('');
  const router = useRouter();
  const asPath = router.asPath;
  const intraId = router.query.intraId;

  const makePath = () => {
    if (asPath === '/' || asPath.includes('token')) {
      setPath(`/pingpong/games?count=${3}&status=${'live'}&gameId=`);
      return;
    }
    const userQuery = intraId ? `/users/${intraId}` : '';
    const seasonQuery = mode === 'rank' && `season=${season}`;
    const modeQuery = mode !== 'both' && `mode=${mode}`;
    const countQuery = router.pathname === '/users/detail' && `count=${5}`;
    const query = [modeQuery, seasonQuery, countQuery, 'gameId=']
      .filter((item) => item)
      .join('&');
    setPath(`/pingpong/games${userQuery}?${query}`);
    return;
  };

  useEffect(() => {
    makePath();
  }, [asPath, intraId, mode, season]);

  return { path };
};

export default useGameResult;
