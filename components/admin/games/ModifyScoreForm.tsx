import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { ModifyScoreType } from 'types/admin/gameLogTypes';
import styles from 'styles/admin/games/GamesTable.module.scss';

export default function ModifyScoreForm({
  gameId,
  team1,
  team2,
}: ModifyScoreType) {
  const setModal = useSetRecoilState(modalState);

  const handleModifyScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const team1Score = Number(form.get('team1Score'));
    const team2Score = Number(form.get('team2Score'));
    if (team1Score !== null && team2Score !== null) {
      setModal({
        modalName: 'ADMIN-MODIFY_SCORE',
        ModifyScore: {
          gameId: gameId,
          team1: { ...team1, score: team1Score, win: team1Score > team2Score },
          team2: { ...team2, score: team2Score, win: team2Score > team1Score },
        },
      });
    }
  };
  return (
    <form
      onSubmit={handleModifyScore}
      id={`Score-Modify-Form-${gameId}`}
      className={styles['scoreForm']}
    >
      <span>게임 점수: </span>
      <input
        type='number'
        name='team1Score'
        min='0'
        max='2'
        defaultValue={team1.score}
        required
      />
      <span> : </span>
      <input
        type='number'
        name='team2Score'
        min='0'
        max='2'
        defaultValue={team2.score}
        required
      />
    </form>
  );
}
