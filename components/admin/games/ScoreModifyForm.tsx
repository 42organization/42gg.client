import { ScoreModifyType } from 'types/admin/gameLogTypes';
import styles from 'styles/admin/games/GamesTable.module.scss';

export default function ScoreModifyForm({
  gameId,
  team1,
  team2,
}: ScoreModifyType) {
  const handleScoreModify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const team1Score = form.get('team1Score');
    const team2Score = form.get('team2Score');
  };
  return (
    <form
      onSubmit={handleScoreModify}
      id='Score-Modify-Form'
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
