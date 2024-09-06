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
  const queryIntraId = useIntraId(); // 쿼리의 id
  const myIntraId = useUser()?.intraId; // 현재 나의 intraId
  const [profileUrl, setProfileUrl] = useState<string>('/profile');
  const isMyProfile = useRef(false); // 내 프로필 페이지인지 아닌지 확인
  const [isIntraId, setIsIntraId] = useState<boolean>(false); // 인트라 아이디가 42에 있는지 확인
  const [isAgendaId, setIsAgendaId] = useState<boolean>(false); // 인트라 아이디가 agenda에 있는지 확인

  /** queryIntraId, myIntraId -> 내 프로필 페이지인지 확인  */
  useEffect(() => {
    if (queryIntraId && myIntraId) {
      if (queryIntraId === myIntraId) {
        isMyProfile.current = true;
      } else {
        isMyProfile.current = false;
        setProfileUrl(`/profile/${queryIntraId}`); // 다른 유저 프로필 페이지이면 profileUrl 변경
      }
    }
  }, [queryIntraId, myIntraId]);

  /** queryIntraId 불러 왔을 시 API 호출 */
  //  GET: intraData (42 인트라 데이터 가져오기)
  const { data: intraData } = useFetchGet<IntraProfileDataProps>({
    url: `/profile/intra/${queryIntraId}`,
    isReady: Boolean(queryIntraId),
  });

  // intraData 있을시 = 42인트라 아이디 있음 (isIntraId = true)
  useEffect(() => {
    if (intraData) {
      setIsIntraId(true);
    }
  }, [intraData]);

  /** 42 인트라 아이디 있을 시 API 호출
   *  GET: agendaProfileData (GG 아젠다 유저 데이터 가져오기)
   */
  const { data: agendaProfileData, getData: getAgendaProfileData } =
    useFetchGet<AgendaProfileDataProps>({
      url: profileUrl,
      // 42에 아이디가 있는 경우에만 데이터 요청
      isReady: isIntraId,
    });

  // 아젠다 프로필 데이터 있음 = 아젠다 유저 등록 되어 있음 (isAgendaId = true)
  useEffect(() => {
    if (agendaProfileData) {
      setIsAgendaId(true);
    }
  }, [agendaProfileData]);

  /** 아젠다 유저 등록 되어 있을 시 API 호출  */
  // GET: host current
  const {
    content: hostCurrentListData,
    PagaNationElementProps: PagaNationHostCurrent,
  } = usePageNation<MyTeamDataProps>({
    url: `/host/current/list/${queryIntraId}`,
    isReady: isAgendaId,
  });

  // GET: current team
  const currentListData = useFetchGet<MyTeamDataProps[]>({
    url: '/profile/current/list',
    isReady: isAgendaId,
  }).data;

  // GET: host history
  const {
    content: hostHistoryListData,
    PagaNationElementProps: PagaNationHostHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/host/history/list/${queryIntraId}`,
    isReady: isAgendaId,
  });

  // GET: history
  const {
    content: historyListData,
    PagaNationElementProps: PagaNationHistory,
  } = usePageNation<HistoryItemProps>({
    url: `/profile/history/list/${queryIntraId}`,
    isReady: isAgendaId,
  });

  /** UI Rendering */
  if (!queryIntraId || !myIntraId) {
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
        {intraData && (
          <ProfileCard
            userIntraId={queryIntraId}
            userContent={
              agendaProfileData?.userContent ||
              'GG에 가입하지 않은 사용자입니다.'
            }
            userGithub={agendaProfileData?.userGithub || ''}
            imageUrl={intraData.imageUrl}
            achievements={intraData.achievements}
            getProfileData={getAgendaProfileData}
            isMyProfile={isMyProfile.current}
          />
        )}
        {/* Ticket */}
        {isMyProfile.current && agendaProfileData ? (
          <Ticket type='component' />
        ) : (
          ''
        )}
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
        {isMyProfile.current && currentListData ? (
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
