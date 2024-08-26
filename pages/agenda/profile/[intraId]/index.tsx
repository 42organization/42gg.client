import { useRouter } from 'next/router';
import { AgendaHistoryItemProps } from 'types/agenda/profile/agendaHistoryTypes';
import { CurrentTeamItemProps } from 'types/agenda/profile/currentTeamTypes';
import { ProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import AgendaHistory from 'components/agenda/Profile/AgendaHistory';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import CurrentTeam from 'components/agenda/Profile/CurrentTeam';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import Ticket from 'components/agenda/Ticket/Ticket';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

//intraid 받아오는 페이지로 세팅 필요
export default function AgendaProfile() {
  const { data: profileData, getData: getProfileData } =
    useFetchGet<ProfileDataProps>('/profile');

  const currentTeamData = useFetchGet<CurrentTeamItemProps[]>(
    '/profile/current/list'
  ).data;

  const router = useRouter();
  const { intraId } = router.query;
  const { content: agendaHistory, PagaNationElementProps } =
    usePageNation<AgendaHistoryItemProps>({
      url: '/profile/history/list/' + intraId,
    });

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
        {agendaHistory && (
          <>
            <AgendaHistory agendaHistory={agendaHistory} />{' '}
            <PageNation {...PagaNationElementProps} />
          </>
        )}
      </div>
    </>
  );
}
