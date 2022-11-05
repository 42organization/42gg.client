import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Match</h1>
      <MatchModeWrap>
        <MatchBoard type='single' />
      </MatchModeWrap>
    </div>
  );
}
