import { useRouter } from 'next/router';
import Profile from '../../components/user/Profile';
import Chart from '../../components/user/Chart';
import { useRecoilValue } from 'recoil';
import { isEditProfileState } from '../../utils/recoil/user';
import EditProfile from '../../components/user/EditProfile';

export default function user() {
  const router = useRouter();
  const { userId } = router.query;
  const isEditProfile = useRecoilValue(isEditProfileState);

  return (
    <div>
      {typeof userId === 'string' && <Profile userId={userId}></Profile>}
      <Chart></Chart>
      {isEditProfile && <EditProfile />}
    </div>
  );
}
