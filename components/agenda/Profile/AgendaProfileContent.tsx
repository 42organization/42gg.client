import Image from 'next/image';
import styles from 'styles/agenda/Profile/AgendaProfileContent.module.scss';

const AgendaProfileContent = () => {
  return (
    <div className={styles.content}>
      <div className={styles.description}>
        안녕하세요. 여기에는 자신의 소개를 간략하게 작성할 수 있습니다! 최대
        길이는 두줄로 하고 싶어요. 아니면 최대 3줄?
        요정도?요정도?요정도?요정도?요정도?요정도?
      </div>
      <hr className={styles.divider} />
      <div className={styles.acheivementContainer}>
        <div className={styles.acheivementText}>Acheivements</div>
        <div className={styles.acheivementImageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src='/image/agenda/acheivement.svg'
              alt='profile image'
              width={30}
              height={30}
              className={styles.imageBox}
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src='/image/agenda/acheivement.svg'
              alt='profile image'
              width={30}
              height={30}
              className={styles.imageBox}
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src='/image/agenda/acheivement.svg'
              alt='profile image'
              width={30}
              height={30}
              className={styles.imageBox}
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src='/image/agenda/acheivement.svg'
              alt='profile image'
              width={30}
              height={30}
              className={styles.imageBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaProfileContent;
