import { ProfileImageCardProps } from 'types/agenda/profile/profileDataTypes';
import CustomImage from 'components/agenda/utils/CustomImage';
import styles from 'styles/agenda/Profile/ProfileCard.module.scss';

const ProfileImageCard = ({ profileData }: ProfileImageCardProps) => {
  return (
    <div>
      <div className={styles.profileImageCard}>
        {/* 추가 예정 : profile Image  */}
        <div className={styles.profileImageWrapper}>
          <CustomImage
            src='/image/agenda/jeongrol.jpeg'
            alt='profile image'
            addClass={styles.profileImageBox}
          />
        </div>

        <div className={styles.userName}>{profileData.userIntraId}</div>

        <div className={styles.linkImages}>
          <div className={styles.linkImageWrapper}>
            {profileData.userGithub ? (
              <a
                href={`https://github.com/${profileData.userGithub}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <CustomImage src='/image/agenda/github.svg' alt='github' />
              </a>
            ) : (
              ''
            )}
          </div>
          <div className={styles.linkImageWrapper}>
            <a
              href={`https://profile.intra.42.fr/users/${profileData.userIntraId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <CustomImage src='/image/agenda/42-icon.svg' alt='42' />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.description}>{profileData.userContent}</div>

        <hr className={styles.divider} />

        <div className={styles.acheivementContainer}>
          <div className={styles.acheivementText}>Acheivements</div>

          <div className={styles.acheivementImageContainer}>
            {/* 추가 예정 : acheivement mapping */}
            <div className={styles.acheivementImageWrapper}>
              <CustomImage
                src='/image/agenda/acheivement.svg'
                alt='acheivement'
              />
            </div>
            <div className={styles.acheivementImageWrapper}>
              <CustomImage
                src='/image/agenda/acheivement.svg'
                alt='acheivement'
              />
            </div>
            <div className={styles.acheivementImageWrapper}>
              <CustomImage
                src='/image/agenda/acheivement.svg'
                alt='acheivement'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCard;
