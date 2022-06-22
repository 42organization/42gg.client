import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileInfoState, isEditProfileState } from '../../utils/recoil/user';
import instance from '../../utils/axios';

interface EditedProfile {
  racketType: string;
  statusMessage: string;
}

const CHAR_LIMIT = 20;

export default function EditProfile() {
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
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

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'statusMessage' && value.length > CHAR_LIMIT)
      value = value.slice(0, CHAR_LIMIT);
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const finishEditHandler = async () => {
    setProfileInfo((prev) => ({
      ...prev,
      ...editedProfile,
    }));
    setIsEditProfile(false);

    try {
      const res = await instance.put(`/pingpong/users/detail`, editedProfile);
      alert(res?.data.message);
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
          maxLength={CHAR_LIMIT}
        ></textarea>
        <span>{`${editedProfile.statusMessage.length}/${CHAR_LIMIT}`}</span>
      </div>
      <div>
        <button onClick={cancelEditHandler}>취소</button>
        <button onClick={finishEditHandler}>확인</button>
      </div>
    </div>
  );
}
