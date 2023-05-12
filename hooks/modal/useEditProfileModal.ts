import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { profileState } from 'utils/recoil/user';

interface EditedProfile {
  racketType: string;
  statusMessage: string;
  snsNotiOpt: 'NONE' | 'SLACK' | 'EMAIL' | 'BOTH';
}

const CHAR_LIMIT = 30;

type useEditProfileModalResult = [
  boolean,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  EditedProfile,
  ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => void,
  () => Promise<void>,
  () => void
];

const useEditProfileModal = (): useEditProfileModalResult => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    racketType: profile.racketType,
    statusMessage: '',
    snsNotiOpt: 'SLACK',
  });
  const [slack, setSlack] = useState<boolean>(true);
  const [email, setEmail] = useState<boolean>(false);
  const { racketType, statusMessage, snsNotiOpt } = profile;

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      racketType,
      statusMessage,
      snsNotiOpt,
    }));
    if (snsNotiOpt === 'BOTH') {
      setSlack(true);
      setEmail(true);
    } else if (snsNotiOpt === 'SLACK') {
      setSlack(true);
      setEmail(false);
    } else if (snsNotiOpt === 'EMAIL') {
      setSlack(false);
      setEmail(true);
    } else {
      setSlack(false);
      setEmail(false);
    }
  }, [profile]);

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'statusMessage' && value.length > CHAR_LIMIT) {
      value = value.slice(0, CHAR_LIMIT);
      setEditedProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const finishEditHandler = async () => {
    if (slack && email) {
      editedProfile.snsNotiOpt = 'BOTH';
    } else if (slack && !email) {
      editedProfile.snsNotiOpt = 'SLACK';
    } else if (!slack && email) {
      editedProfile.snsNotiOpt = 'EMAIL';
    } else {
      editedProfile.snsNotiOpt = 'NONE';
    }

    setProfile((prev) => ({
      ...prev,
      ...editedProfile,
    }));

    try {
      await instance.put(`/pingpong/users/detail`, editedProfile);
      alert('프로필이 성공적으로 등록되었습니다.');
    } catch (e) {
      setError('JH02');
    }
    setModal({ modalName: null });
  };

  const cancelEditHandler = () => setModal({ modalName: null });

  return [
    slack,
    email,
    setEmail,
    editedProfile,
    inputChangeHandler,
    finishEditHandler,
    cancelEditHandler,
  ];
};

export default useEditProfileModal;
