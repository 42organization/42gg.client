import { useState, useEffect } from 'react';
import { ProfileCardProps } from 'types/agenda/profile/profileCardTypes';
import CustomImage from 'components/agenda/utils/CustomImage';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Profile/ProfileCard.module.scss';

const ProfileImageCard = ({
  userIntraId,
  userContent,
  userGithub,
  ticketCount, // NOT YET : ticket
  getProfileData,
}: ProfileCardProps) => {
  // 프로필 수정 버튼,수정 취소 버튼 180도 회전
  const [isFlipped, setIsFlipped] = useState(false);
  // 프로필 수정 취소 시, 기존 데이터로 복구
  const [initialProfileData, setInitialProfileData] = useState({
    userContent,
    userGithub,
  });
  // 프로필 수정 시, 데이터 변하는 것 감지
  const [profileData, setProfileData] = useState({
    userContent,
    userGithub,
  });

  // 수정 성공 시, 수정된 데이터로 초기화
  useEffect(() => {
    setProfileData({ userContent, userGithub });
    setInitialProfileData({ userContent, userGithub });
  }, [userContent, userGithub]);

  // 클릭 시 isFlipped, true <-> false 변환
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 수정되는 데이터 감지
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const { sendRequest: editProfile } = useFetchRequest();
  // 프로필 수정 - 수정하기 / PATCH 요청
  const handleEdit = async () => {
    editProfile(
      'PATCH',
      'profile',
      {
        userContent: profileData.userContent,
        userGithub: profileData.userGithub,
      },
      {},
      () => {
        getProfileData();
        handleFlip();
      },
      (error: string) => {
        console.error(error);
      }
    );
  };

  // 프로필 수정 - 취소하기
  const handleCancel = () => {
    setProfileData(initialProfileData);
    handleFlip();
  };

  return (
    <div className={styles.profileImageCard}>
      <div
        className={`${styles.cardInner} ${
          isFlipped ? styles['rotate-180'] : ''
        }`}
      >
        {/* Back Side */}
        <div className={styles.backCard}>
          <div className={styles.editTitle}>프로필 수정</div>

          <div className={styles.editContainer}>
            <label className={styles.editSubTitle}>상태 메시지</label>
            <textarea
              name='userContent'
              maxLength={50}
              wrap='soft'
              value={profileData.userContent}
              placeholder='상태 메시지를 입력하세요.'
              className={styles.editDescription}
              onChange={handleChange}
            />
          </div>

          <div className={styles.editContainer}>
            <div className={styles.editSubTitle}>정보 추가</div>
            <div className={styles.editOtherInfo}>
              <div className={styles.editOtherInfoItem}>
                <div className={styles.infoText}>GitHub</div>
                <input
                  type='text'
                  name='userGithub'
                  placeholder='깃 허브 URL'
                  value={
                    profileData.userGithub !== null
                      ? profileData.userGithub
                      : ''
                  }
                  className={styles.infoInput}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.submitContainer}>
            <button onClick={handleEdit} className={styles.submitBtn}>
              수정하기
            </button>
            <button onClick={handleCancel} className={styles.submitBtn}>
              취소하기
            </button>
          </div>
        </div>

        {/* Front Side */}
        <div className={styles.frontCard}>
          <div className={styles.profileImage}>
            {/* 추가 예정 : profile Image  */}
            <div className={styles.profileImageWrapper}>
              <CustomImage
                src='/image/agenda/jeongrol.jpeg'
                alt='profile image'
                addClass={styles.profileImageBox}
              />
            </div>

            <div className={styles.userNameWrapper}>
              <div className={styles.userName}>{userIntraId}</div>
              <div className={styles.editWrapper} onClick={handleFlip}>
                <CustomImage src='/image/agenda/edit.svg' alt='edit' />
              </div>
            </div>

            <div className={styles.linkImages}>
              <div className={styles.linkImageWrapper}>
                {userGithub ? (
                  <a
                    href={userGithub}
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
                  href={`https://profile.intra.42.fr/users/${userIntraId}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <CustomImage src='/image/agenda/42-icon.svg' alt='42' />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.description}>{userContent}</div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCard;
