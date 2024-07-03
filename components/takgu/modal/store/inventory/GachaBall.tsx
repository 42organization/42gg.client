import styles from 'styles/modal/store/GachaBall.module.scss';

export default function GachaBall() {
  const balls = Array.from({ length: 11 }, (el, i) => 'ball' + i.toString());

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.balls}>
          {balls.map((ball) => (
            <div key={ball} className={styles[ball]} />
          ))}
        </div>
      </div>
    </div>
  );
}
