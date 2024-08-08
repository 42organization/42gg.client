import { profile } from 'console';
import { useEffect, useState } from 'react';
import { AgendaHistoryItemProps } from 'types/agenda/profile/agendaHistoryTypes';
import { CurrentTeamItemProps } from 'types/agenda/profile/currentTeamTypes';
import { ProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaHistory from 'components/agenda/Profile/AgendaHistory';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import CurrentTeam from 'components/agenda/Profile/CurrentTeam';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

export default function AgendaProfile() {
  const [profileData, setProfileData] = useState<ProfileDataProps | null>(null);
  const [currentTeamData, setCurrentTeamData] = useState<
    CurrentTeamItemProps[] | null
  >(null);
  const [agendaHistory, setAgendaHistory] = useState<
    AgendaHistoryItemProps[] | null
  >(null);

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
  const fetchProfileData = async () => {
    try {
      const res = await instanceInAgenda.get(`/profile`);
      setProfileData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentTeamData = async () => {
    try {
      const res = await instanceInAgenda.get('/profile/current/list');
      setCurrentTeamData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // agendaHistory API : IN PROGRESS
  const fetchAgendaHistory = async () => {
    try {
      const res = await instanceInAgenda.get('/profile/history/list', {
        params: {
          page: 1,
          size: 1,
        },
      });
      setAgendaHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchCurrentTeamData();
    fetchAgendaHistory();
  }, []);

  // useEffect(() => {
  //   // API Data Check
  //   console.log('ProfileData :', profileData);
  //   console.log('CurrentAgenda :', currentTeamData);
  //   console.log('History :', agendaHistory);
  // }, [profileData, currentTeamData, agendaHistory]);

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
          />
        )}
        {currentTeamData && (
          <CurrentTeam currentTeamData={currentTeamMockData} />
        )}
        {agendaHistory && <AgendaHistory agendaHistory={historyMockData} />}
      </div>
    </>
  );
}
