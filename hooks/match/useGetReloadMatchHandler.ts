import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { Match } from 'types/matchTypes';
import { MatchMode } from 'types/mainType';
import { reloadMatchState } from 'utils/recoil/match';

import useAxiosGet from 'hooks/useAxiosGet';
import useReloadHandler from 'hooks/useReloadHandler';

interface useGetReloadMatchHandlerProps {
  setMatch: Dispatch<SetStateAction<Match | null>>;
  setSpinReloadButton: Dispatch<SetStateAction<boolean>>;
  type: string;
  toggleMode: MatchMode;
}

const useGetReloadMatchHandler = ({
  setMatch,
  setSpinReloadButton,
  type,
  toggleMode,
}: useGetReloadMatchHandlerProps): (() => void) => {
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);

  const getMatchHandler = useAxiosGet({
    url: `/pingpong/match/tables/${1}/${toggleMode}/${type}`,
    setState: setMatch,
    err: 'SJ01',
    type: 'setError',
  });
  // const useGetReloadMatchHandler = ({
  //   setMatch,
  //   setSpinReloadButton,
  //   type,
  //   toggleMode,
  // }: useGetReloadMatchHandlerProps): (() => void) => {
  //   const [reloadMatch, setReloadMatch] =
  //     useRecoilState<boolean>(reloadMatchState);

  //   const getMatchHandler = useAxiosGet({
  //     url: `/pingpong/match/tables/${1}/${toggleMode}/${type}`,
  //     setState: setMatch,
  //     err: 'SJ01',
  //     type: 'setError',
  //   });

  const reloadMatchHandler = useReloadHandler({
    setSpinReloadButton: setSpinReloadButton,
    setState: setReloadMatch,
    state: true,
  });

  useEffect(() => {
    setReloadMatch(true);
  }, [toggleMode]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  return reloadMatchHandler;
};

export default useGetReloadMatchHandler;
