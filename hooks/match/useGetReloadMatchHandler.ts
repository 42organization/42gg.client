import { useEffect, Dispatch, SetStateAction } from 'react';
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import { Match } from 'types/matchTypes';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { MatchMode } from 'types/mainType';
import { reloadMatchState } from 'utils/recoil/match';

type useGetReloadMatchHandlerProps = [
  Dispatch<SetStateAction<Match | null>>,
  Dispatch<SetStateAction<boolean>>,
  string,
  MatchMode
];

type useGetReloadMatchHandlerReturn = () => void;

const useGetReloadMatchHandler = ([
  setMatch,
  setSpinReloadButton,
  type,
  toggleMode,
]: useGetReloadMatchHandlerProps): useGetReloadMatchHandlerReturn => {
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);
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
    setReloadMatch(true);
  }, [toggleMode]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  return reloadMatchHandler;
};

export default useGetReloadMatchHandler;
