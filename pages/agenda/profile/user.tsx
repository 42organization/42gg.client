import { useState, useEffect, useRef } from 'react';
import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { HistoryItemProps } from 'types/agenda/profile/historyListTypes';
import {
  AgendaProfileDataProps,
  IntraProfileDataProps,
} from 'types/agenda/profile/profileDataTypes';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import CurrentList from 'components/agenda/Profile/CurrentList';
import HistoryList from 'components/agenda/Profile/HistoryList';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import Ticket from 'components/agenda/Ticket/Ticket';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import PageNation from 'components/Pagination';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useIntraId from 'hooks/agenda/useIntraId';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

const AgendaProfile = () => {
  const intraId = useIntraId(); // 쿼리의 id
  const userIntraId = useUser()?.intraId; // 현재 나의 intraId
  const [profileUrl, setProfileUrl] = useState<string>('/profile');
  const [myProfileCheck, setMyProfileCheck] = useState<boolean | null>(null);
  const isIntraId = useRef(false); // 인트라 아이디가 42에 있는지 확인
  const isAgendaId = useRef(false); // 인트라 아이디가 agenda에 있는지 확인

  useEffect(() => {
    if (intraId && userIntraId) {
      if (intraId === userIntraId) {
        setMyProfileCheck(true);
      } else {
        setProfileUrl(`/profile/${intraId}`);
        setMyProfileCheck(false);
      }
    }
  }, [intraId, userIntraId]);
  const { data: intraData, getData: getIntraData } =
    useFetchGet<IntraProfileDataProps>({
      url: `/profile/intra/${intraId}`,
      isReady: Boolean(intraId),
    });

  /** Agenda API GET */
  const { data: agendaProfileData, getData: getAgendaProfileData } =
    useFetchGet<AgendaProfileDataProps>({
      url: profileUrl,
      // 본인이거나 42에 아이디가 있는 경우에만 데이터 요청
      isReady: Boolean(
        intraId === userIntraId || (intraId && isIntraId.current)
      ),
    });

  // useEffect(() => {
  //   if (intraId) {
  //     getProfileData();
  //   }
  // }, [intraId]);

  // host current
  const {
    content: hostCurrentListData,
    PagaNationElementProps: PagaNationHostCurrent,
  } = usePageNation<MyTeamDataProps>({
    url: `/host/current/list/${intraId}`,
    isReady: Boolean(intraId && isAgendaId.current),
  });

  // current team
  const currentListData = useFetchGet<MyTeamDataProps[]>({
    url: '/profile/current/list',
  }).data;

  // host history
  const {
    content: hostHistoryListData,
    PagaNationElementProps: PagaNationHostHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/host/history/list/${intraId}`,
    isReady: Boolean(intraId && isAgendaId.current),
  });

  // history
  const {
    content: historyListData,
    PagaNationElementProps: PagaNationHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/profile/history/list/${intraId}`,
    isReady: Boolean(intraId && isAgendaId.current),
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
        {intraData && intraId && (
          <ProfileCard
            userIntraId={intraId}
            userContent={
              agendaProfileData?.userContent ||
              'GG에 가입하지 않은 사용자입니다.'
            }
            userGithub={agendaProfileData?.userGithub || ''}
            imageUrl={intraData.imageUrl}
            achievements={intraData.achievements}
            getProfileData={getAgendaProfileData}
            isMyProfile={myProfileCheck}
          />
        )}
        {/* Ticket */}
        {myProfileCheck ? <Ticket type='component' /> : ''}
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
        {myProfileCheck && currentListData ? (
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
