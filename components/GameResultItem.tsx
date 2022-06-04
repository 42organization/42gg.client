import styles from "../styles/GameResultItem.module.css";
import { Matches } from "../types/game/gametypes";

export default function GameResultItem({ game }: { game: Matches }) {
  const { team1, team2, time, status } = game;
  return (
    <div className={styles.div}>
      <div>
        <div>{team1.userImageUri}</div>
        <div>{team2.userImageUri}</div>
      </div>
      <div>
        <div>{time}</div>
        <div>{status}</div>
      </div>
      <div>2 : 1</div>
      <div>
        <div>intra id : {team1.userId}</div>
        <div>intra id : {team2.userId}</div>
      </div>
      <div>
        <div>{team1.winRate}</div>
        <div>{team2.winRate}</div>
      </div>
    </div>
  );
}
