import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { fillZero } from 'utils/handleTime';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import agendastyles from 'styles/agenda/Home/AgendaInfo.module.scss';
import styles from 'styles/agenda/Home/MyTeamInfo.module.scss';

// Props: API data
const MyTeamInfo = ({
  myTeamInfo,
  key,
}: {
  myTeamInfo: MyTeamDataProps;
  key: number;
}) => {
  if (!myTeamInfo) {
    return <div>참가중인 일정이 없습니다.</div>;
  }
  // myTeamInfo.isOfficial = true; //css test
  const startDate = new Date(myTeamInfo.agendaStartTime);
  //아래 주석달린 부분은 api 변경시 추가 예정입니다.
  return (
    <div className={styles.Container} key={key}>
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
          <h2 className={styles.teamTitle}>
            팀이름 : {myTeamInfo.agendaTitle}
          </h2>
          {/* <div className={styles.agendaStatus}>
          {myTeamInfo.isOfficial ? <AgendaTag tagName='공식' /> : ''}
        </div> */}
        </div>
        <div className={styles.agendaInfoContainer}>
          <h3 className={styles.agendaTitle}>
            아젠다 : {myTeamInfo.agendaTitle}
          </h3>
          <div className={styles.agendaTagBox}>
            {myTeamInfo.isOfficial ? <AgendaTag tagName='공식' /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeamInfo;
