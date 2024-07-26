import styles from 'styles/agenda/TeamDetail/TeamButtons.module.scss';

const TeamButtons = ({ authority }: { authority: string }) => {
  switch (authority) {
    case 'LEADER':
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button}>폭파하기</button>
          <button className={styles.confirm_button}>확정하기</button>
        </div>
      );
    case 'MEMBER':
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button}>폭파하기</button>
        </div>
      );
    default:
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button}>참가하기</button>
        </div>
      );
  }
};

export default TeamButtons;
