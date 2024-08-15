import styles from 'styles/agenda/TeamDetail/TeamButtons.module.scss';

const TeamButtons = ({
  authority,
  editBtn,
  onSubmit,
}: {
  authority: string;
  editBtn?: boolean;
  onSubmit?: () => void;
}) => {
  switch (authority) {
    case 'LEADER':
      if (editBtn)
        /* Edit */
        return (
          <div className={styles.buttonContainer}>
            <button className={styles.button}>취소하기</button>
            <button className={styles.confirm_button} onClick={onSubmit}>
              제출하기
            </button>
          </div>
        );
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
    case 'NONE':
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button}>참가하기</button>
        </div>
      );
    default:
      return null;
  }
};

export default TeamButtons;
