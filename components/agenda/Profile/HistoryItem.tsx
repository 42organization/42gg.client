import Image from 'next/image';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import styles from 'styles/agenda/Profile/HistoryItem.module.scss';

const HistoryItem = () => {
  return (
    <div className={styles.historyItem}>
      <div className={styles.agendaTitle}>PUSH SWAP 경진 대회</div>

      <div className={styles.tagWrapper}>
        {/* tag mapping */}
        <AgendaTag tagName='공식' />
        <AgendaTag tagName='팀' />
      </div>

      <div className={styles.timeWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src='/image/agenda/Time.svg'
            width={15}
            height={15}
            alt='Time'
            className={styles.imageBox}
          />
        </div>
        <div>2024.12.31</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.teamName}>TeamName</div>

      <div className={styles.teamIntraIdWrapper}>
        <Image
          src='/image/agenda/rock-and-roll-hand.svg'
          width={15}
          height={15}
          alt='team'
          className={styles.imageBox}
        />
        {/* intra id mapping */}
        <div>jeongrol, </div>
        <div>jeongrol, </div>
        <div>jeongrol</div>
      </div>

      <div className={styles.coalitionWrapper}></div>
    </div>
  );
};

export default HistoryItem;
