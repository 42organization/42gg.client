import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileInfoState, isEditProfileState } from '../../utils/recoil/user';
import { useState } from 'react';
import { postData } from '../../utils/axios';

interface EditedProfile {
  userImageUri: string;
  racketType: string;
  statusMessage: string;
}

export default function EditProfile() {
  const setIsEditProfil = useSetRecoilState(isEditProfileState);
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

  const onChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onEdit = async () => {
    setProfileInfo((prev) => ({
      ...prev,
      ...editedProfile,
    }));
    setIsEditProfil(false);
    const res = await postData(
      `/pingpong/users/${userId}/detail`,
      editedProfile
    );
    alert(res.message);
  };

  const onCancel = () => {
    setIsEditProfil(false);
  };

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
            onChange={onChange}
            checked={editedProfile.racketType === 'penholder'}
          />{' '}
          penholder
        </label>
        <label>
          <input
            type='radio'
            name='racketType'
            value='shakehand'
            onChange={onChange}
            checked={editedProfile.racketType === 'shakehand'}
          />{' '}
          shakehand
        </label>
      </div>
      <div>
        <textarea
          value={editedProfile.statusMessage}
          name='statusMessage'
          onChange={onChange}
        ></textarea>
      </div>
      <div>
        <button onClick={onCancel}>취소</button>
        <button onClick={onEdit}>확인</button>
      </div>
    </div>
  );
}
