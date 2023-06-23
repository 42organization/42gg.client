import { useEffect, useState } from 'react';
import { seasonListState, latestSeasonIdState } from 'utils/recoil/seasons';
import { useRecoilValue } from 'recoil';
import { ToggleMode } from 'types/rankTypes';

const useSeasonDropDown = (
  clickTitle?: boolean,
  intraId?: string | string[] | undefined
) => {
  const latestSeasonId = useRecoilValue(latestSeasonIdState);
  const { seasonList } = useRecoilValue(seasonListState);
  const seasonMode: ToggleMode = 'RANK';
  const [season, setSeason] = useState<number>(
    useRecoilValue(latestSeasonIdState)
  );
  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  const TitleSeasonHandler = useEffect(() => {
    setSeason(latestSeasonId);
  }, [clickTitle, intraId]);

  return {
    seasonList,
    season,
    seasonDropDownHandler,
    seasonMode,
    TitleSeasonHandler,
  };
};

export default useSeasonDropDown;
