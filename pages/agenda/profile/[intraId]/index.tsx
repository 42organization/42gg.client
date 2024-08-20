import { AgendaHistoryItemProps } from 'types/agenda/profile/agendaHistoryTypes';
import { CurrentTeamItemProps } from 'types/agenda/profile/currentTeamTypes';
import { ProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import AgendaHistory from 'components/agenda/Profile/AgendaHistory';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import CurrentTeam from 'components/agenda/Profile/CurrentTeam';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import Ticket from 'components/agenda/Ticket/Ticket';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

//intraid 받아오는 페이지로 세팅 필요
export default function AgendaProfile() {
  const { data: profileData, getData: getProfileData } =
    useFetchGet<ProfileDataProps>('/profile');

  const currentTeamData = useFetchGet<CurrentTeamItemProps[]>(
    '/profile/current/list'
  ).data;

  const agendaHistory = useFetchGet<AgendaHistoryItemProps[]>(
    '/profile/history/list',
    {
      page: 1,
      size: 20,
    }
  ).data;

  // currentTeam MOCK DATA
  const currentTeamMockData: CurrentTeamItemProps[] = [
    {
      agendaId: '123',
      agendaTitle: 'PUSH SWAP CONTEST',
      agendaLocation: 'SEOUL',
      teamKey: 'TEAMKEY1',
      isOfficial: true,
      teamName: 'jeongrol',
    },
    {
      agendaId: '1234',
      agendaTitle: 'League Of Legend 42',
      agendaLocation: 'SEOUL',
      teamKey: 'TEAMKEY2',
      isOfficial: true,
      teamName: '7-8기 멤버단',
    },
  ];
  // history MOCK DATA
  const historyMockData: AgendaHistoryItemProps[] = [
    {
      agendaId: 'agendaId1',
      agendaTitle: '아젠다 타이틀1',
      agendaStartTime: new Date(),
      agendaEndTime: new Date(),
      agendaCurrentTeam: 8,
      agendaLocation: 'seoul',
      teamKey: 'team1',
      isOfficial: false,
      agendaMaxPeople: 100,
      teamName: 'team Name',
      teamMates: [
        {
          intraId: 'intraId1',
          coalition: 'GUN',
        },
        {
          intraId: 'intraId2',
          coalition: 'GON',
        },
        {
          intraId: 'intraId3',
          coalition: 'LEE',
        },
      ],
    },
  ];

  return (
    <>
      <div className={styles.agendaProfileContainer}>
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
        {profileData && (
          <ProfileCard
            userIntraId={profileData.userIntraId}
            userContent={profileData.userContent}
            userGithub={profileData.userGithub}
            ticketCount={profileData.ticketCount}
            getProfileData={getProfileData}
          />
        )}
        <Ticket type='component' />
        {currentTeamData && <CurrentTeam currentTeamData={currentTeamData} />}
        {agendaHistory && <AgendaHistory agendaHistory={agendaHistory} />}
      </div>
    </>
  );
}
