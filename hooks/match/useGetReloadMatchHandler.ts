import { useEffect, Dispatch, SetStateAction } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Match } from 'types/matchTypes';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/match';
import { MatchMode } from 'types/mainType';

type useMatchBoardHandlerProps = [
  Dispatch<SetStateAction<Match | null>>,
  Dispatch<SetStateAction<boolean>>,
  string,
  MatchMode
];

const useGetReloadMatchHandler = ([
  setMatch,
  setSpinReloadButton,
  type,
  toggleMode,
]: useMatchBoardHandlerProps): (() => void) => {
  const reloadMatch = useRecoilValue<boolean>(reloadMatchState);
  const setReloadMatch = useSetRecoilState<boolean>(reloadMatchState);
  const setError = useSetRecoilState<string>(errorState);

  const getMatchHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/match/tables/${1}/${toggleMode}/${type}`
      );
      setMatch(res?.data);
    } catch (e) {
      setError('SJ01');
    }
  };

  const reloadMatchHandler = () => {
    setSpinReloadButton(true);
    setTimeout(() => {
      setSpinReloadButton(false);
    }, 1000);
    setReloadMatch(true);
  };

  useEffect(() => {
    if (reloadMatch) {
      getMatchHandler();
    }
  }, [reloadMatch]);

  useEffect(() => {
    setReloadMatch(true);
  }, [toggleMode]);

  return reloadMatchHandler;
};

export default useGetReloadMatchHandler;
