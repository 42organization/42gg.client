import { useSetRecoilState, SetterOrUpdater } from 'recoil';
import { Modal } from 'types/modalTypes';
import { ProfileBasic } from 'types/takgu/userTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/takgu/recoil/error';
import { modalState } from 'utils/takgu/recoil/modal';
import { EditedProfile } from 'components/takgu/modal/profile/EditProfileModal';

interface useEditProfileModalProps {
  slack: boolean;
  email: boolean;
  editedProfile: EditedProfile;
  setProfile: SetterOrUpdater<ProfileBasic>;
  intraId: string;
}

type useEditProfileModalReturn = [() => Promise<void>, () => void];

const useEditProfileModal = ({
  slack,
  email,
  editedProfile,
  setProfile,
  intraId,
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

    try {
      await instance.put(`/pingpong/users/${intraId}`, editedProfile);
      setProfile((prev) => ({
        ...prev,
        ...editedProfile,
      }));
      alert('프로필이 성공적으로 등록되었습니다.');
    } catch (e: any) {
      if (e.response.status === 403) {
        alert('카카오 유저는 프로필을 수정할 수 없습니다.');
      } else setError('JH02');
    }
    setModal({ modalName: null });
  };

  const cancelEditHandler = () => setModal({ modalName: null });

  return [finishEditHandler, cancelEditHandler];
};

export default useEditProfileModal;
