import { NextRouter, useRouter } from 'next/router';
import { AgendaInfoProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import AgendaTags from 'components/agenda/utils/AgendaTags';
import { isSoloTeam } from 'components/agenda/utils/team';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';
import StartDate from '../utils/StartDate';

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
  router.push(`/agenda/${agendaKey}/host/modify`);
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
  intraId,
}: AgendaInfoProps) {
  const sendRequest = useFetchRequest().sendRequest;

  const subscribeSolo = ({ agendaKey }: CallbackProps) => {
    const soloData = {
      teamName: intraId,
      teamLocation: agendaData.agendaLocation,
      teamContent: '개인참여',
      teamIsPrivate: false,
    };

    // 개인 참여
    sendRequest(
      'POST',
      'team',
      soloData,
      { agenda_key: agendaKey },
      (response: any) => {
        const newTeamKey = response ? response.teamKey : null;
        if (newTeamKey) {
          // 개인 참여 확정
          sendRequest(
            'PATCH',
            'team/confirm',
            {},
            { agenda_key: agendaKey, teamKey: newTeamKey },
            () => {
              window.location.reload();
            },
            (err) => {
              console.log('개인 확정에 실패했습니다.', err);
            }
          );
        } else {
          console.log('개인 팀키를 찾지 못했습니다.');
        }
      },
      (err) => {
        console.log('개인 참여에 실패했습니다.', err);
      }
    );
  };

  const unsubscribeSolo = ({ agendaKey }: CallbackProps) => {
    const myTeamKey = myTeam ? myTeam.teamKey : null;

    sendRequest(
      'PATCH',
      'team/cancel',
      {},
      {
        agenda_key: agendaKey,
        teamKey: myTeamKey,
      },
      () => {
        window.location.reload();
      },
      (err) => {
        console.log('등록취소에 실패했습니다.', err);
      }
    );
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
          return { text: '주최자 관리', callback: hostMode };
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
      <div
        className={`${styles.infoContainer} ${containerSize}`}
        style={{
          background: `linear-gradient(0deg, #fff 7rem, rgba(0, 0, 0, 0) 10rem), url(${
            agendaData.agendaPosterUrl || '/image/agenda/42.jpg'
          }) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            <div className={styles.web}>
              {StartDate(agendaData.agendaStartTime as string)}
            </div>
            <h2>{agendaTitle}</h2>
            <div className={styles.organizerWrap}>
              <span>주최자 : {agendaHost}</span>
            </div>
            <div className={styles.mobile}>{AgendaTags(agendaData)}</div>
            <div className={styles.buttonWarp}>
              {isAgendaDetail && <ShareBtn onClick={copyLink} />}
              {isAgendaDetail && buttonData && (
                <UploadBtn
                  text={buttonData.text}
                  onClick={() => {
                    buttonData.callback({
                      router: router,
                      agendaKey: agendaKey,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
