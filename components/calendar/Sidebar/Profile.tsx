import { IntraProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';
import { useUserId } from '../userContext';

const CalendarProfile = () => {
  const intraId = useUser()?.intraId;

  // const { data: intraData } = useFetchGet<IntraProfileDataProps>({
  //   url: `/profile/intra/${intraId}`,
  //   isReady: Boolean(intraId),
  // });

  // console.log(intraData);
  return (
    <div>
      <p>{intraId}</p>
    </div>
  );
};

export default CalendarProfile;
