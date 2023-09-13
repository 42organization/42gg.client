import { SeasonMode } from 'types/mainType';
import GameResultList from 'components/game/GameResultList';
import useGameResult from 'hooks/game/useGameResult';

interface GameResultProps {
  mode?: SeasonMode;
  season?: number;
}

export default function GameResult({ mode, season }: GameResultProps) {
  const path = useGameResult({ mode: mode, season: season });
  return <div>{path && <GameResultList path={path} radioMode={mode} />}</div>;
}
