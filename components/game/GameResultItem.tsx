import styles from "../../styles/GameResultItem.module.css";
import { Game } from "../../types/gameTypes";

export default function GameResultItem({ game }: { game: Game }) {
  const { team1, team2, time, status, type } = game;
  return (
    <div className={styles.div}>
      <div>
        <div>게임 타입 : {type}</div>
        <div>{team1.userImageUri}</div>
        <div>{team2.userImageUri}</div>
      </div>
      <div>
        <div>{time}</div>
        <div>{status}</div>
      </div>
      <div>이긴사람 : {team1.isWin ? team1.userId : team2.userId}</div>
      <div>
        스코어 {team1.score} : {team2.score}
      </div>
      <div>
        <div>intra id : {team1.userId}</div>
        <div>{team1.wins} 승 </div>
        <div>{team1.losses} 패 </div>
        <div>intra id : {team2.userId}</div>
        <div>{team2.wins} 승 </div>
        <div>{team2.losses} 패 </div>
      </div>
      <div>
        <div>team1 ppp {team1.winRate}</div>
        <div>team2 ppp {team2.winRate}</div>
      </div>
    </div>
  );
}
