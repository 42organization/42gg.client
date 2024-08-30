import { SeasonMode } from 'types/takgu/mainType';
import GameResultList from 'components/takgu/game/GameResultList';
import useGameResult from 'hooks/takgu/game/useGameResult';

interface GameResultProps {
  mode?: SeasonMode;
  season?: number;
}

export default function GameResult({ mode, season }: GameResultProps) {
  const path = useGameResult({ mode: mode, season: season });
  return <div>{path && <GameResultList path={path} radioMode={mode} />}</div>;
}
