import styles from "../styles/GameResultItem.module.css";

export default function GameResultItem() {
  return (
    <div className={styles.div}>
      <div>
        <div>동그라미</div>
        <div>동그라미2</div>
      </div>
      <div>
        <div>남은 시간</div>
        <div>경기 종료</div>
      </div>
      <div>2 : 1</div>
      <div>
        <div>intra id : kipark</div>
        <div>intra id : nheo</div>
      </div>
      <div>
        <div>1승 2패</div>
        <div>10승 1패</div>
      </div>
    </div>
  );
}
