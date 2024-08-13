import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { AgendaInfoProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
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

const determineButtonText = ({
  agendaData,
  isHost,
  status,
}: AgendaInfoProps) => {
  const isParticipant = status === 200;
  const teamText = isTeam(agendaData) ? '팀 만들기' : '참가하기';

  switch (agendaData.agendaStatus) {
    case AgendaStatus.CONFIRM:
      return isHost ? '결과입력' : '';
    case AgendaStatus.OPEN:
      if (isHost) {
        return '주최자 관리';
      }
      return isParticipant ? '' : teamText;

    default:
      return '';
  }
};

export default function AgendaInfo({
  agendaData,
  isHost,
  status,
}: AgendaInfoProps) {
  const buttonText = determineButtonText({
    agendaData,
    isHost,
    status,
  });

  const { agendaTitle, agendaHost } = agendaData;

  const isAgendaDetail = isHost !== undefined && status !== undefined;
  const containerSize = isAgendaDetail
    ? styles.largeHeight
    : styles.smallHeight;

  return (
    <>
      <div className={`${styles.infoContainer} ${containerSize}`}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            {isAgendaDetail && buttonText !== '' && (
              <div className={styles.enrollWarp}>
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
