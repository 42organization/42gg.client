import styles from 'styles/modal/store/GachaAction.module.scss';

type GachaActionProps = {
  randomItem: string;
};

export default function GachaAction({ randomItem }: GachaActionProps) {
  const randomBall = 'ball' + Math.floor(Math.random() * 11).toString();
  return (
    <div className={styles.container}>
      <div className={styles.ball}>
        <div className={`${styles[randomBall]}`}></div>
      </div>
      <div>{randomItem}</div>
    </div>
  );
}
