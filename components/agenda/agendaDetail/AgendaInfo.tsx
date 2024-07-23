import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  AgendaLocation,
  AgendaStatus,
  Coalition,
} from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';

// 목데이터 생성
const mockData = {
  agendaTitle: '아 기다리고기다리던대회',
  agendaContents:
    '이 대회는 언제부터 시작되어 어쩌구저쩌구 뭐를 겨루려고 했는데 비밀이에요',
  agendaDeadLine: new Date('2024-07-20'),
  agendaStartTime: new Date('2024-07-25'),
  agendaEndTime: new Date('2024-07-30'),
  agendaMinTeam: 3,
  agendaMaxTeam: 10,
  agendaCurrentTeam: 5,
  agendaMinPeople: 2,
  agendaMaxPeople: 5,
  agendaPoster: null,
  agendaHost: 'iamgroot',
  agendaLocation: '서울',
  agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
};

// 개인상세조회
const profileData = {
  userIntra: 'iamgroot',
  userContent: '안녕하세요',
  userGithub: 'test@github.abc',
  userCoalition: Coalition.GUN,
  userLocation: AgendaLocation.SEOUL,
  ticketCount: 1,
};

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('링크가 복사되었습니다.');
};

const participationIn = () => {
  alert('참여신청이 완료되었습니다.');
};

const hostMode = () => {
  alert('주최자 관리 버튼입니다.');
};

const makeTeam = () => {
  alert('팀 만들기 버튼입니다.');
};

const submitResults = () => {
  alert('결과 입력 버튼입니다.');
};

const isTeam = (agendaData) => {
  return agendaData.agendaMinPeople !== agendaData.agendaMaxPeople;
};

const getIsHost = (profileData, agendaData) => {
  return profileData.userIntra === agendaData.agendaHost;
};

const getIsParticipant = (teamList) => {
  return teamList === 200;
};

// 버튼 텍스트 결정 함수
const determineButtonText = (agendaStatus, isHost, isParticipant, isTeam) => {
  if (agendaStatus === AgendaStatus.CONFIRM) {
    return isHost ? '결과입력' : '';
  } else if (agendaStatus === AgendaStatus.ON_GOING) {
    if (isTeam) {
      return isHost ? '주최자 관리' : !isParticipant ? '팀 만들기' : '';
    } else {
      return isHost ? '주최자 관리' : !isParticipant ? '참가하기' : '';
    }
  }
  return '';
};

export default function AgendaInfo() {
  // storybook에서 사용하기 위해 인자 넣어줌
  // export default function AgendaInfo({
  //   agendaData,
  //   profileData,
  //   teamListStatus,
  // }) {

  const router = useRouter();
  const { agendaKey } = router.query;
  const [agendaData, setAgendaData] = useState(null);
  const [teamListStatus, setTeamListStatus] = useState(null);

  useEffect(() => {
    // axios.get(`/api/agenda?agenda_id=${agendaKey}`)
    //   .then(response => setAgendaData(response.data))
    //   .catch(error => console.error(error));

    setAgendaData(mockData);
    setTeamListStatus(204);
  }, [agendaKey]);

  if (!agendaData) {
    return <div>Loading...</div>;
  }

  const { agendaTitle, agendaHost, agendaStatus } = agendaData;

  const isHost = getIsHost(profileData, agendaData);
  const isParticipant = getIsParticipant(teamListStatus);

  const buttonText = determineButtonText(
    agendaStatus,
    isHost,
    isParticipant,
    isTeam(agendaData)
  );

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            <div className={styles.enrollWarp}>
              {buttonText !== '' && (
                <UploadBtn
                  text={buttonText}
                  onClick={
                    buttonText === '팀 만들기'
                      ? makeTeam
                      : buttonText === '참가하기'
                      ? participationIn
                      : buttonText === '주최자 관리'
                      ? hostMode
                      : submitResults
                  }
                />
              )}
            </div>
            <div className={styles.titleWarp}>
              <h2>{agendaTitle}</h2>
              <ShareBtn onClick={copyLink} />
            </div>
            <div className={styles.organizerWrap}>
              <span>주최자 : {agendaHost}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
