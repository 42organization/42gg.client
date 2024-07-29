import Image from 'next/image';
import styles from 'styles/agenda/Profile/AgendaProfileImageBox.module.scss';

const AgendaProfileImageBox = () => {
  return (
    <div className={styles.agendaProfileImageBox}>
      <div className={styles.imageWrapper}>
        <Image
          src='/image/agenda/jeongrol.jpeg'
          alt='profile image'
          width={30}
          height={30}
          className={styles.imageBox}
        />
      </div>
      <div className={styles.userName}>jeongrol</div>
    </div>
  );
};

export default AgendaProfileImageBox;
