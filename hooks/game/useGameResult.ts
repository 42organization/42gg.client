import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SeasonMode } from 'types/mainType';

interface GameResultProps {
  mode?: SeasonMode;
  seasonId?: number;
}

const useGameResult = ({ mode, seasonId }: GameResultProps) => {
  const [path, setPath] = useState('');
  const router = useRouter();
  const asPath = router.asPath;
  const intraId = router.query.intraId;

  useEffect(() => {
    const makePath = () => {
      const basePath = '/pingpong/games';
      if (asPath === '/' || asPath.includes('token')) {
        // live 상태 포함 최근 3개의 게임만 가져온다.
        setPath(`${basePath}?page=${0}&size=${3}&status=${'LIVE'}`);
        return;
      }
      const modePath = mode === 'both' ? '/' : `/${mode}`;
      const userQuery = intraId && `intraId=${intraId}`;
      const seasonQuery = mode === 'rank' && `season=${seasonId}`;
      const sizeQuery = router.pathname === '/users/detail' && `size=${5}`;
      const query = [userQuery, seasonQuery, sizeQuery]
        .filter((item) => item)
        .join('&');
      setPath(`${basePath}${modePath}?${query}`);
      return;
    };
    makePath();
  }, [asPath, intraId, mode, seasonId]);

  return path;
};

export default useGameResult;
