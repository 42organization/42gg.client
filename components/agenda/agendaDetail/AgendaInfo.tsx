import { NextRouter, useRouter } from 'next/router';
import { AgendaInfoProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';
import { isSoloTeam } from '../utils/team';

interface CallbackProps {
  router: NextRouter;
  agendaKey: string;
}

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('링크가 복사되었습니다.');
};

// api 호출 필요
const participateSolo = () => {
  alert('참여신청이 완료되었습니다.');
};

const hostMode = ({ router, agendaKey }: CallbackProps) => {
  router.push(`/agenda/${agendaKey}/host`);
  alert('주최자 관리 버튼입니다.');
};

const participateTeam = ({ router, agendaKey }: CallbackProps) => {
  router.push(`/agenda/${agendaKey}/create-team`);
  alert('팀 만들기 버튼입니다.');
};

const submitResults = ({ router, agendaKey }: CallbackProps) => {
  router.push(`/agenda/${agendaKey}/host/result`);
  alert('결과 입력 버튼입니다.');
};

const determineButton = ({ agendaData, isHost, status }: AgendaInfoProps) => {
  const isParticipant = status === 200;
  switch (agendaData.agendaStatus) {
    case AgendaStatus.CONFIRM:
      return isHost ? { text: '결과입력', callback: submitResults } : null;
    case AgendaStatus.OPEN:
      if (isHost) {
        return { text: '주최자 관리', callback: hostMode };
      } else if (isParticipant) {
        return null; // 참가자는 버튼이 없음, 아래 본인 팀 상세정보 확인 가능
      } else if (
        isSoloTeam(agendaData.agendaMinPeople, agendaData.agendaMaxPeople)
      )
        return { text: '참가하기', callback: participateSolo };
      else return { text: '팀 만들기', callback: participateTeam };
    default:
      return null;
  }
};

export default function AgendaInfo({
  agendaData,
  isHost,
  status,
}: AgendaInfoProps) {
  const buttonData = determineButton({
    agendaData,
    isHost,
    status,
  });

  const { agendaTitle, agendaHost, agendaKey } = agendaData;

  const isAgendaDetail = isHost !== undefined && status !== undefined;
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
