import Image from 'next/image';
import styles from 'styles/agenda/Profile/ProfileImageCard.module.scss';

const ProfileImageCard = () => {
  return (
    <div className={styles.profileImageCard}>
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
      <div className={styles.linkImages}>
        <div className={styles.imageWrapper}>
          <Image
            src='/image/agenda/github.svg'
            alt='profile image'
            width={30}
            height={30}
            className={styles.imageBox}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src='/image/agenda/42-icon.svg'
            alt='profile image'
            width={30}
            height={30}
            className={styles.imageBox}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCard;
