import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { MatchMode } from 'types/takgu/mainType';
import { Match } from 'types/takgu/matchTypes';
import { reloadMatchState } from 'utils/recoil/match';
import useAxiosGet from 'hooks/useAxiosGet';
import useReloadHandler from 'hooks/useReloadHandler';

interface useGetReloadMatchHandlerProps {
  setMatch: Dispatch<SetStateAction<Match | null>>;
  setSpinReloadButton: Dispatch<SetStateAction<boolean>>;
  radioMode: MatchMode;
}

const useGetReloadMatchHandler = ({
  setMatch,
  setSpinReloadButton,
  radioMode,
}: useGetReloadMatchHandlerProps): (() => void) => {
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);

  const getMatchHandler = useAxiosGet({
    url: `/pingpong/match/time/scope?mode=${radioMode}`,
    setState: setMatch,
    err: 'SJ01',
    type: 'setError',
  });

  const reloadMatchHandler = useReloadHandler({
    setSpinReloadButton: setSpinReloadButton,
    setState: setReloadMatch,
    state: true,
  });

  useEffect(() => {
    getMatchHandler();
  }, [radioMode]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  return reloadMatchHandler;
};

export default useGetReloadMatchHandler;
