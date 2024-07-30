import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { AgendaStatus , Coalition } from 'constants/agenda/agenda';
import Participant from 'components/agenda/agendaDetail/tabs/Participant';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import AgendaParticipatingBox from 'components/agenda/Profile/AgendaParticipatingBox';
import styles from 'styles/agenda/Profile/AgendaParticipatingTeam.module.scss';

const agendaData: AgendaDataProps = {
  agendaTitle: '아 기다리고기다리던대회',
  agendaContents:
    '이 대회는 언제부터 시작되어 어쩌구저쩌구 뭐를 겨루려고 했는데 비밀이에요',
  agendaDeadLine: new Date('2024-07-20'),
  agendaStartTime: new Date('2024-07-25'),
  agendaEndTime: new Date('2024-07-30'),
  agendaMinTeam: 3,
  agendaMaxTeam: 10,
  agendaCurrentTeam: 5,
  agendaMinPeople: 5, // 개인 팀 설정
  agendaMaxPeople: 5,
  agendaPoster: null,
  agendaHost: 'iamgroot',
  agendaLocation: '서울',
  agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
  agendaisRanking: true,
};

const team = {
  teamName: '팀 A',
  teamLeaderIntraId: 'leaderA',
  teamMateCount: 3,
  teamKey: '1',
};

const participant = { name: 'intraId1', coalition: Coalition.GUN };

const AgendaParticipatingTeam = () => {
  return (
    <div className={styles.participatingTeam}>
      <div className={styles.participatingText}>참여중인 팀</div>
      <div className={styles.participatingItems}>
        <AgendaParticipatingBox />
        <AgendaParticipatingBox />
        <AgendaParticipatingBox />
        <AgendaParticipatingBox />
        <AgendaParticipatingBox />
        <AgendaParticipatingBox />
      </div>
    </div>
  );
};

export default AgendaParticipatingTeam;
