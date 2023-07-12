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

  useEffect(() => {
    const makePath = () => {
      const basePath = '/pingpong/games';
      if (asPath === '/') {
        // live 상태 포함 최근 3개의 게임만 가져온다.
        setPath(`${basePath}?size=${3}&status=${'LIVE'}`);
        return;
      }
      const modePath = mode === 'BOTH' || !mode ? '' : `/${mode.toLowerCase()}`;
      const userQuery = intraId && `intraId=${intraId}`;
      const seasonQuery = mode === 'RANK' && `seasonId=${season}`;
      const sizeQuery =
        router.pathname === '/users/detail' ? `size=${5}` : `size=${10}`;
      const query = [userQuery, seasonQuery, sizeQuery]
        .filter((item) => item)
        .join('&');
      setPath(`${basePath}${modePath}?${query}`);
      return;
    };
    makePath();
  }, [asPath, intraId, mode, season]);

  return path;
};

export default useGameResult;
