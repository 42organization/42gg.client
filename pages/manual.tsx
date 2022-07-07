import MatchManualModal from 'components/modal/MatchManualModal';
import styles from 'styles/Manual.module.scss';

export default function Manual() {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.container}>
        <MatchManualModal isPage={true} />
      </div>
    </div>
  );
}
