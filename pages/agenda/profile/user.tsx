import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
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
  const [activeTab, setActiveTab] = useState('current'); // 현재 활성화된 탭 상태 관리

  /** API GET */
  //  GET: intraData (42 인트라 데이터 가져오기)
  const { data: intraData } = useFetchGet<IntraProfileDataProps>({
    url: `/profile/intra/${queryIntraId}`,
    isReady: Boolean(queryIntraId),
  });
  // GET: agendaProfileData (GG 아젠다 유저 데이터 가져오기)
  const { data: agendaProfileData, getData: getAgendaProfileData } =
    useFetchGet<AgendaProfileDataProps>({
      url: profileUrl,
      isReady: isIntraId,
    });
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

  /** useEffect */
  useEffect(() => {
    // 1. queryIntraId와 myIntraId가 있을 때 프로필 URL 설정
    if (queryIntraId && myIntraId) {
      if (queryIntraId === myIntraId) {
        isMyProfile.current = true;
      } else {
        isMyProfile.current = false;
        setProfileUrl(`/profile/${queryIntraId}`); // 다른 유저 프로필 URL 설정
      }
    }
    // 2. intraData가 있으면 인트라 아이디가 42에 있다는 뜻이므로 isIntraId = true
    if (intraData) {
      setIsIntraId(true);
    }
    // 3. agendaProfileData가 있으면 아젠다에 등록된 사용자이므로 isAgendaId = true
    if (agendaProfileData) {
      setIsAgendaId(true);
    }
  }, [queryIntraId, myIntraId, intraData, agendaProfileData]);

  console.log('agendaProfileData:', intraData);
  console.log('agendaProfileData:', agendaProfileData);
  console.log('hostCurrentListData:', hostCurrentListData);
  console.log('currentListData:', currentListData);
  console.log('hostHistoryListData:', hostHistoryListData);
  console.log('historyListData:', historyListData);
  console.log('------------------------------------');
  /** UI Rendering */
  if (!queryIntraId || !myIntraId) {
    return <AgendaLoading />;
  }
  return (
    <>
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
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
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>AGENDA LIST</div>
          <div className={styles.listButtonsWrapper}>
            <Button
              sx={{
                color: activeTab === 'current' ? '#af71ff' : 'black',
                '@media (min-width: 961px)': {
                  fontSize: '1rem', // 폰트 크기 변경
                },
              }}
              onClick={() => setActiveTab('current')}
            >
              참여중
            </Button>
            <Button
              sx={{
                color: activeTab === 'hostCurrent' ? '#af71ff' : 'black',
                '@media (min-width: 961px)': {
                  fontSize: '1rem',
                },
              }}
              onClick={() => setActiveTab('hostCurrent')}
            >
              개최중
            </Button>
            <Button
              sx={{
                color: activeTab === 'history' ? '#af71ff' : 'black',
                '@media (min-width: 961px)': {
                  fontSize: '1rem',
                },
              }}
              onClick={() => setActiveTab('history')}
            >
              참여 기록
            </Button>
            <Button
              sx={{
                color: activeTab === 'hostHistory' ? '#af71ff' : 'black',
                '@media (min-width: 961px)': {
                  fontSize: '1rem',
                },
              }}
              onClick={() => setActiveTab('hostHistory')}
            >
              개최 기록
            </Button>
          </div>
          <hr className={styles.divider} />
          <div className={styles.listItemContainer}>
            {/* Host Current List */}
            {activeTab === 'hostCurrent' &&
            hostCurrentListData &&
            hostCurrentListData.length > 0 ? (
              <>
                <CurrentList currentListData={hostCurrentListData} />
                <PageNation {...PagaNationHostCurrent} />
              </>
            ) : activeTab === 'hostCurrent' ? (
              ''
            ) : null}

            {/* Current List */}
            {activeTab === 'current' &&
            isMyProfile.current &&
            currentListData ? (
              <>
                <CurrentList currentListData={currentListData} />
              </>
            ) : activeTab === 'current' ? (
              ''
            ) : null}

            {/* History Host List */}
            {activeTab === 'hostHistory' &&
            hostHistoryListData &&
            hostHistoryListData.length > 0 ? (
              <>
                <HistoryList historyListData={hostHistoryListData} />{' '}
                <PageNation {...PagaNationHostHistory} />
              </>
            ) : activeTab === 'hostHistory' ? (
              ''
            ) : null}

            {/* History List */}
            {activeTab === 'history' && historyListData ? (
              <>
                <HistoryList historyListData={historyListData} />{' '}
                <PageNation {...PagaNationHistory} />
              </>
            ) : activeTab === 'history' ? (
              ''
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgendaProfile;
