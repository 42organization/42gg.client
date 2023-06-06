import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { ScoreModifyType } from 'types/admin/gameLogTypes';
import styles from 'styles/admin/games/GamesTable.module.scss';

export default function ScoreModifyForm({
  gameId,
  team1,
  team2,
}: ScoreModifyType) {
  const setModal = useSetRecoilState(modalState);

  const handleScoreModify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const team1Score = Number(form.get('team1Score'));
    const team2Score = Number(form.get('team2Score'));
    if (team1Score !== null && team2Score !== null) {
      setModal({
        modalName: 'ADMIN-SCORE_MODIFY',
        scoreModify: {
          gameId: gameId,
          team1: { ...team1, score: team1Score, win: team1Score > team2Score },
          team2: { ...team2, score: team2Score, win: team2Score > team1Score },
        },
      });
    }
  };
  return (
    <form
      onSubmit={handleScoreModify}
      id={`Score-Modify-Form-${gameId}`}
      className={styles['scoreForm']}
    >
      <label>
        <span>Team1 Score:</span>
        <input
          type='number'
          name='team1Score'
          min='0'
          max='2'
          defaultValue={team1.score}
          required
        />
      </label>
      <label>
        <span>Team2 Score:</span>
        <input
          type='number'
          name='team2Score'
          min='0'
          max='2'
          defaultValue={team2.score}
          required
        />
      </label>
    </form>
  );
}
