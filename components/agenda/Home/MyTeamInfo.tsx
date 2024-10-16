import Link from 'next/link';
import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { AgendaTag } from 'components/agenda/utils/AgendaTag';
import StartDate from 'components/agenda/utils/StartDate';
import styles from 'styles/agenda/Home/MyTeamInfo.module.scss';

// Props: API data
const MyTeamInfo = ({
  myTeamInfo,
  idx,
}: {
  myTeamInfo: MyTeamDataProps;
  idx: number;
}) => {
  if (!myTeamInfo) {
    return <div>참가중인 일정이 없습니다.</div>;
  }
  return (
    <Link href={`/agenda/detail?agenda_key=${myTeamInfo.agendaKey}`} key={idx}>
      <div className={styles.Container} key={idx}>
        {StartDate(myTeamInfo.agendaStartTime as string)}
        <div className={styles.infoContainer}>
          <div className={styles.teamInfoContainer}>
            {myTeamInfo.teamName ? (
              <>
                <h2 className={styles.teamTitle}>{myTeamInfo.teamName}</h2>
                <div className={styles.agendaTagBox}>
                  {myTeamInfo.teamStatus === 'OPEN' ? (
                    <AgendaTag tagName='모집중' />
                  ) : (
                    <AgendaTag tagName='확정팀' />
                  )}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <div className={styles.agendaInfoContainer}>
            <h3 className={styles.agendaTitle}>{myTeamInfo.agendaTitle}</h3>
            <div className={styles.agendaTagBox}>
              {myTeamInfo.isOfficial ? <AgendaTag tagName='공식' /> : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyTeamInfo;
