import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileInfoState, isEditProfileState } from '../../utils/recoil/user';
import { postData } from '../../utils/axios';

interface EditedProfile {
  userImageUri: string;
  racketType: string;
  statusMessage: string;
}

export default function EditProfile() {
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    userImageUri: '',
    racketType: 'penholder',
    statusMessage: '',
  });
  const {
    userId,
    userImageUri,
    rank,
    ppp,
    winRate,
    racketType,
    statusMessage,
  } = profileInfo;

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      racketType,
      statusMessage,
    }));
  }, [profileInfo]);

  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const finishEditHandler = async () => {
    setProfileInfo((prev) => ({
      ...prev,
      ...editedProfile,
    }));
    setIsEditProfile(false);

    try {
      const res = await postData(
        `/pingpong/users/${userId}/detail`,
        editedProfile
      );
      alert(res.message);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEditHandler = () => setIsEditProfile(false);

  return (
    <div>
      <div>
        <span>{rank} </span>
        <span>{ppp} </span>
        <span>{userImageUri} </span>
        <span>{userId} </span>
      </div>
      <div>
        <span>{winRate}</span>
      </div>
      <div>
        <label>
          <input
            type='radio'
            name='racketType'
            value='penholder'
            onChange={inputChangeHandler}
            checked={editedProfile.racketType === 'penholder'}
          />{' '}
          penholder
        </label>
        <label>
          <input
            type='radio'
            name='racketType'
            value='shakehand'
            onChange={inputChangeHandler}
            checked={editedProfile.racketType === 'shakehand'}
          />{' '}
          shakehand
        </label>
      </div>
      <div>
        <textarea
          value={editedProfile.statusMessage}
          name='statusMessage'
          onChange={inputChangeHandler}
        ></textarea>
      </div>
      <div>
        <button onClick={cancelEditHandler}>취소</button>
        <button onClick={finishEditHandler}>확인</button>
      </div>
    </div>
  );
}
