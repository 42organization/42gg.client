import { IntraProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import { useUserId } from 'components/calendar/userContext';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';

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
