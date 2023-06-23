import { GameStatus, GameMode } from 'types/gameTypes';

export default function gameScore(
  type: 'BIG' | 'SMALL',
  mode: GameMode,
  status: GameStatus,
  scoreTeam1?: number,
  scoreTeam2?: number
) {
  let score = '';
  if (mode === 'RANK') {
    if (status === 'END') score = `${scoreTeam1} : ${scoreTeam2}`;
    else score = 'VS';
  } else {
    score = type === 'BIG' ? 'VS' : '일반전';
  }
  return score;
}
