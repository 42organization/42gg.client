import { useEffect, useState } from 'react';
import { AgendaHistoryProps } from 'types/agenda/profile/agendaHistoryTypes';
import { CurrentAgendaProps } from 'types/agenda/profile/currentAgendaTypes';
import { ProfileDataProps } from 'types/agenda/profile/profileDataTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaHistory from 'components/agenda/Profile/AgendaHistory';
import AgendaUserSearchBar from 'components/agenda/Profile/AgendaUserSearchBar';
import ParticipatingTeam from 'components/agenda/Profile/ParticipatingTeam';
import ProfileCard from 'components/agenda/Profile/ProfileCard';
import styles from 'styles/agenda/Profile/AgendaProfile.module.scss';

export default function AgendaProfile() {
  const [profileData, setProfileData] = useState<ProfileDataProps | null>(null);
  const [currentAgenda, setCurrentAgenda] = useState<CurrentAgendaProps | null>(
    null
  );
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

  const fetchCurrentAgenda = async () => {
    try {
      const res = await instanceInAgenda.get('/profile/current/list');
      setCurrentAgenda(res.data);
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
    fetchCurrentAgenda();
    fetchAgendaHistory();
  }, []);

  useEffect(() => {
    console.log('ProfileData :', profileData);
    console.log('CurrentAgenda :', currentAgenda);
    console.log('History :', agendaHistory);
  }, [profileData, currentAgenda, agendaHistory]);

  return (
    <>
      <div className={styles.agendaProfileContainer}>
        <div className={styles.agendaUserSearchBarWrap}>
          <AgendaUserSearchBar />
        </div>
        <ProfileCard profileData={profileData} />
        <ParticipatingTeam />
        <AgendaHistory />
      </div>
    </>
  );
}
