import { NextRouter, useRouter } from 'next/router';
import { AgendaInfoProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import { isSoloTeam } from 'components/agenda/utils/team';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';

interface CallbackProps {
  router: NextRouter;
  agendaKey: string;
}

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('링크가 복사되었습니다.');
};

const hostMode = ({ router, agendaKey }: CallbackProps) => {
  // router.push(`/agenda/${agendaKey}/host/modify`); // 기존 코드 - 주최자가 대회 수정
  router.push(`/agenda/${agendaKey}/host/createAnnouncement`); // 공지사항 추가로 변경
};

const subscribeTeam = ({ router, agendaKey }: CallbackProps) => {
  router.push(`/agenda/${agendaKey}/create-team`);
};

const submitResults = ({ router, agendaKey }: CallbackProps) => {
  router.push(`/agenda/${agendaKey}/host/result`);
};

export default function AgendaInfo({
  agendaData,
  isHost,
  myTeamStatus,
  myTeam,
}: AgendaInfoProps) {
  const sendRequest = useFetchRequest().sendRequest;

  const subscribeSolo = ({ router, agendaKey }: CallbackProps) => {
    const soloData = {
      teamName: '개인참여',
      teamLocation: agendaData.agendaLocation,
      teamContent: '개인참여',
      teamIsPrivate: false,
    };
    sendRequest('POST', 'team', soloData, { agenda_key: agendaKey });
    // 데이터 리프레시 필요
  };

  const unsubscribeSolo = ({ router, agendaKey }: CallbackProps) => {
    const myTeamKey = myTeam ? myTeam.teamKey : null;

    sendRequest(
      'PATCH',
      'team/cancel',
      {},
      {
        agenda_key: agendaKey,
        teamKey: myTeamKey,
      }
    );
    // 데이터 리프레시 필요
  };

  const determineButton = () => {
    const isParticipant = myTeamStatus === 200;
    const isSolo = isSoloTeam(
      agendaData.agendaMinPeople,
      agendaData.agendaMaxPeople
    );

    switch (agendaData.agendaStatus) {
      case AgendaStatus.CONFIRM:
        return isHost ? { text: '결과입력', callback: submitResults } : null;
      case AgendaStatus.OPEN:
        if (isHost) {
          // 주최자
          return { text: '공지사항 추가', callback: hostMode }; // 주최자 관리 -> 대회 수정 / (변경) 공지사항 추가 버튼
        } else if (isParticipant) {
          // 참가자
          if (isSolo) {
            return { text: '등록취소', callback: unsubscribeSolo };
          }
          return null;
        } else {
          // 손님
          if (isSolo) {
            return { text: '등록하기', callback: subscribeSolo };
          }
          return { text: '팀 만들기', callback: subscribeTeam };
        }
      default:
        return null;
    }
  };

  const buttonData = determineButton();

  const { agendaTitle, agendaHost, agendaKey } = agendaData;

  const isAgendaDetail = isHost !== undefined && myTeamStatus !== undefined;
  const containerSize = isAgendaDetail
    ? styles.largeHeight
    : styles.smallHeight;

  const router = useRouter();

  return (
    <>
      <div className={`${styles.infoContainer} ${containerSize}`}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            {isAgendaDetail && buttonData && (
              <div className={styles.enrollWarp}>
                <UploadBtn
                  text={buttonData.text}
                  onClick={() => {
                    buttonData.callback({
                      router: router,
                      agendaKey: agendaKey,
                    });
                  }}
                />
              </div>
            )}
            <div className={styles.titleWarp}>
              <h2>{agendaTitle}</h2>
              {isAgendaDetail && <ShareBtn onClick={copyLink} />}
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
