import Link from 'next/link';
import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { fillZero } from 'utils/handleTime';
import { AgendaTag } from 'components/agenda/utils/AgendaTag';
import agendastyles from 'styles/agenda/Home/AgendaInfo.module.scss';
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
  const startDate = new Date(myTeamInfo.agendaStartTime as string);

  return (
    <Link
      href={`/agenda/${myTeamInfo.agendaKey}${
        myTeamInfo.teamKey ? '/' + myTeamInfo.teamKey : ''
      }`}
      key={idx}
    >
      <div className={styles.Container} key={idx}>
        <div className={agendastyles.agendaDateBox}>
          <div className={agendastyles.agendaStartDateMonth}>
            {fillZero(`${startDate.getMonth()}`, 2)}
          </div>

          <div className={agendastyles.agendaStartDateDay}>
            {fillZero(`${startDate.getDate()}`, 2)}
          </div>
        </div>
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
