import { ITeam } from 'types/admin/gameLogTypes';
import styles from 'styles/admin/games/GamesTable.module.scss';

type ScoreModifyFormProps = {
  team1: ITeam;
  team2: ITeam;
};

export default function ScoreModifyForm({
  team1,
  team2,
}: ScoreModifyFormProps) {
  const handleScoreModify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
