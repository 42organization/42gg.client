import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { isEditProfileState } from '../../utils/recoil/user';
import Chart from '../../components/user/Chart';
import Profile from '../../components/user/Profile';
import EditProfile from '../../components/user/EditProfile';

export default function user() {
  const router = useRouter();
  const { userId } = router.query;
  const isEditProfile = useRecoilValue(isEditProfileState);

  return (
    <div>
      {typeof userId === 'string' && (
        <>
          <Profile userId={userId}></Profile>
          <Chart userId={userId}></Chart>
        </>
      )}
      {isEditProfile && <EditProfile />}
    </div>
  );
}
