import { useRouter } from 'next/router';
import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { HistoryItemProps } from 'types/agenda/profile/historyListTypes';
import { ProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import CurrentList from 'components/agenda/Profile/CurrentList';
import HistoryList from 'components/agenda/Profile/HistoryList';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import Ticket from 'components/agenda/Ticket/Ticket';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import PageNation from 'components/Pagination';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

const AgendaProfile = () => {
  const intraId = useRouter().query.id;
  const userIntraId = useUser()?.intraId; // 현재 나의 intraId
  const isMyProfile = intraId === userIntraId ? true : false;

  /** API GET */
  const { data: profileData, getData: getProfileData } =
    useFetchGet<ProfileDataProps>(
      isMyProfile ? '/profile' : `/profile/${intraId}`
    );

  // host current
  const {
    content: hostCurrentListData,
    PagaNationElementProps: PagaNationHostCurrent,
  } = usePageNation<MyTeamDataProps>({
    url: `/host/current/list/${intraId}`,
  });

  // current team
  const currentListData = useFetchGet<MyTeamDataProps[]>(
    '/profile/current/list'
  ).data;

  // host history
  const {
    content: hostHistoryListData,
    PagaNationElementProps: PagaNationHostHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/host/history/list/${intraId}`,
  });

  // history
  const {
    content: historyListData,
    PagaNationElementProps: PagaNationHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/profile/history/list/${intraId}`,
  });

  if (!intraId || !userIntraId) {
    return <AgendaLoading />;
  }
  return (
    <>
      <div className={styles.agendaProfileContainer}>
        {/* SearchBar */}
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
        {/* ProfileCard */}
        {profileData && (
          <ProfileCard
            userIntraId={profileData.userIntraId}
            userContent={profileData.userContent}
            userGithub={profileData.userGithub}
            imageUrl={profileData.imageUrl}
            achievements={profileData.achievements}
            getProfileData={getProfileData}
            isMyProfile={isMyProfile}
          />
        )}
        {/* Ticket */}
        {isMyProfile ? <Ticket type='component' /> : ''}
        {/* Host Current List */}
        {hostCurrentListData && hostCurrentListData.length > 0 ? (
          <>
            <CurrentList currentListData={hostCurrentListData} isHost={true} />
            <PageNation {...PagaNationHostCurrent} />
          </>
        ) : (
          ''
        )}
        {/* Current List */}
        {isMyProfile && currentListData ? (
          <CurrentList currentListData={currentListData} isHost={false} />
        ) : (
          ''
        )}
        {/* History Host List */}
        {hostHistoryListData && hostHistoryListData.length > 0 ? (
          <>
            <HistoryList historyListData={hostHistoryListData} isHost={true} />{' '}
            <PageNation {...PagaNationHostHistory} />
          </>
        ) : (
          ''
        )}
        {/* History List */}
        {historyListData ? (
          <>
            <HistoryList historyListData={historyListData} isHost={false} />{' '}
            <PageNation {...PagaNationHistory} />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default AgendaProfile;
