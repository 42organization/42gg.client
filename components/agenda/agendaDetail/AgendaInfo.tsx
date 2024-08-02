import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { ParticipantSummaryProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { LoginInfoDataProps } from 'types/agenda/profile/profileDataTypes';
import { instanceInAgenda } from 'utils/axios';
import { AgendaStatus } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';

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

const isTeam = (agendaData: AgendaDataProps) => {
  return agendaData.agendaMinPeople !== agendaData.agendaMaxPeople;
};

const getIsHost = (
  profileData: LoginInfoDataProps,
  agendaData: AgendaDataProps
) => {
  return profileData.intraId === agendaData.agendaHost;
};

const getIsParticipant = (teamList: number) => {
  return teamList === 200;
};

// 버튼 텍스트 결정 함수
const determineButtonText = ({
  agendaStatus,
  isHost,
  isParticipant,
  isTeam,
}: ParticipantSummaryProps) => {
  if (agendaStatus === AgendaStatus.CONFIRM) {
    return isHost ? '결과입력' : '';
  } else if (agendaStatus === AgendaStatus.OPEN) {
    if (isTeam) {
      return isHost ? '주최자 관리' : !isParticipant ? '팀 만들기' : '';
    } else {
      return isHost ? '주최자 관리' : !isParticipant ? '참가하기' : '';
    }
  }
  return '';
};

export default function AgendaInfo() {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [agendaData, setAgendaData] = useState<AgendaDataProps>();
  const [teamListStatus, setTeamListStatus] = useState<number>();
  const [profileData, setProfileData] = useState<LoginInfoDataProps>();
  const [buttonText, setButtonText] = useState<string>('initial');

  const fetchAgendaData = async () => {
    if (agendaKey) {
      try {
        const res = await instanceInAgenda.get(`?agenda_key=${agendaKey}`);
        setAgendaData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchTeamList = async () => {
    if (agendaKey) {
      try {
        const res = await instanceInAgenda.get(
          `team/my?agenda_key=${agendaKey}`
        );
        setTeamListStatus(res.status);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchLoginData = async () => {
    try {
      const res = await instanceInAgenda.get('profile/info');
      setProfileData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgendaData();
    fetchTeamList();
    fetchLoginData();
  }, [agendaKey]);

  useEffect(() => {
    if (agendaData && teamListStatus !== undefined && profileData) {
      const isHost = getIsHost(profileData, agendaData);
      const isParticipant = getIsParticipant(teamListStatus);
      const text = determineButtonText({
        agendaStatus: agendaData.agendaStatus,
        isHost,
        isParticipant,
        isTeam: isTeam(agendaData),
      });
      setButtonText(text); // 버튼 텍스트 설정
    }
  }, [agendaData, teamListStatus, profileData]); // 의존성 배열에 추가

  if (!agendaData || teamListStatus === undefined || !profileData) {
    return <div>Loading...</div>;
  }

  const { agendaTitle, agendaHost } = agendaData;

  console.log('tex', buttonText);

  // if (type === 'team') {
  //   return (
  //     <div className={styles.infoContainer}>
  //       <div className={styles.infoWarp}>
  //         <div className={styles.contentWarp}>
  //           <div className={styles.enrollWarp}>
  //             {buttonText !== '' && (
  //               <UploadBtn
  //                 text={buttonText}
  //                 onClick={
  //                   buttonText === '팀 만들기'
  //                     ? makeTeam
  //                     : buttonText === '참가하기'
  //                     ? participationIn
  //                     : buttonText === '주최자 관리'
  //                     ? hostMode
  //                     : submitResults
  //                 }
  //               />
  //             )}
  //           </div>
  //           <div className={styles.titleWarp}>
  //             <h2>{agendaTitle}</h2>
  //             <ShareBtn onClick={copyLink} />
  //           </div>
  //           <div className={styles.organizerWrap}>
  //             <span>주최자 : {agendaHost}</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
