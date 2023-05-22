import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { ProfileBasic } from 'types/userTypes';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { EditedProfile } from 'components/modal/profile/EditProfileModal';
import { Modal } from 'types/modalTypes';

interface useEditProfileModalProps {
  slack: boolean;
  email: boolean;
  editedProfile: EditedProfile;
  setProfile: SetterOrUpdater<ProfileBasic>;
}

type useEditProfileModalReturn = [() => Promise<void>, () => void];

const useEditProfileModal = ({
  slack,
  email,
  editedProfile,
  setProfile,
}: useEditProfileModalProps): useEditProfileModalReturn => {
  const setError = useSetRecoilState<string>(errorState);
  const setModal = useSetRecoilState<Modal>(modalState);

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

  return [finishEditHandler, cancelEditHandler];
};

export default useEditProfileModal;
