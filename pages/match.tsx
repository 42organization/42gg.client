import MatchBoard from 'components/match/MatchBoard';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Match</h1>
      <MatchBoard type='single' />
    </div>
  );
}
