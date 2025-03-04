import { useUserId } from '../userContext';

const CalendarProfile = () => {
  const userContext = useUserId();
  const intraId = userContext ? userContext.userId : null;

  return (
    <div>
      <p>{intraId}</p>
    </div>
  );
};

export default CalendarProfile;
