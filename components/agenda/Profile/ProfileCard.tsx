import { useState, useEffect } from 'react';
import { ProfileCardProps } from 'types/agenda/profile/profileCardTypes';
import CustomImage from 'components/agenda/utils/CustomImage';
import IntraIcon from 'public/image/agenda/42-icon.svg';
import EditIcon from 'public/image/agenda/edit.svg';
import GithubIcon from 'public/image/agenda/github.svg';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Profile/ProfileCard.module.scss';

const ProfileCard = ({
  userIntraId,
  userContent,
  userGithub,
  imageUrl,
  achievements,
  getProfileData,
  isMyProfile,
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
        {isMyProfile ? (
          <div className={styles.backCard}>
            <div className={styles.editTitle}>프로필 수정</div>

            <div className={styles.editContainer}>
              <label className={styles.editSubTitle}>상태 메시지</label>
              <textarea
                name='userContent'
                maxLength={50}
                wrap='soft'
                key={userIntraId}
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
        ) : (
          ''
        )}

        {/* Front Side */}
        <div className={styles.frontCard}>
          <div className={styles.profileImage}>
            <div className={styles.profileImageWrapper}>
              <CustomImage
                key={imageUrl}
                src={imageUrl}
                alt='profile image'
                addClass={styles.profileImageBox}
                isProfileImage={true}
              />
            </div>

            <div className={styles.userNameWrapper}>
              <div className={styles.userName}>{userIntraId}</div>
              {isMyProfile ? (
                <div className={styles.editWrapper} onClick={handleFlip}>
                  <EditIcon />
                </div>
              ) : (
                ''
              )}
            </div>

            <div className={styles.linkImages}>
              <div className={styles.linkImageWrapper}>
                {userGithub ? (
                  <a
                    href={userGithub}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <GithubIcon />
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
                  key={userIntraId}
                >
                  <IntraIcon />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.description} key={userIntraId}>
              {userContent}
            </div>

            <hr className={styles.divider} />

            <div className={styles.acheivementContainer}>
              <div className={styles.acheivementText}>Acheivements</div>
              <div
                className={styles.acheivementImageContainer}
                key={userIntraId}
              >
                {achievements.length
                  ? achievements.map((data, index) => {
                      const imageUrl = data.image;

                      if (imageUrl) {
                        const parsedUrl = imageUrl.replace(
                          '/uploads',
                          'https://cdn.intra.42.fr'
                        );

                        return (
                          <div
                            key={index}
                            className={styles.acheivementImageWrapper}
                          >
                            <CustomImage src={parsedUrl} alt='achievement' />
                          </div>
                        );
                      }
                      return null;
                    })
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
