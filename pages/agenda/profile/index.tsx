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
      // MOCK DATA
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
      setAgendaHistory(historyMockData);
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
        {profileData && <ProfileCard profileData={profileData} />}
        {currentTeamData && <CurrentTeam currentTeamData={currentTeamData} />}
        {agendaHistory && <AgendaHistory agendaHistory={agendaHistory} />}
      </div>
    </>
  );
}
