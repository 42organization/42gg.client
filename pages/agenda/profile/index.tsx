import { useEffect, useState } from 'react';
import { AgendaHistoryProps } from 'types/agenda/profile/agendaHistoryTypes';
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
    AgendaHistoryProps[] | null
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

  useEffect(() => {
    console.log('ProfileData :', profileData);
    console.log('CurrentAgenda :', currentTeamData);
    console.log('History :', agendaHistory);
  }, [profileData, currentTeamData, agendaHistory]);

  return (
    <>
      <div className={styles.agendaProfileContainer}>
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
        {profileData && <ProfileCard profileData={profileData} />}
        {currentTeamData && <CurrentTeam currentTeamData={currentTeamData} />}
        <AgendaHistory />
      </div>
    </>
  );
}
