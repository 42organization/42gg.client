import Image from 'next/image';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { showPeriod, fillZero } from 'utils/handleTime';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import { isSoloTeam } from 'components/agenda/utils/team';
import styles from 'styles/agenda/Home/AgendaInfo.module.scss';

// Props: API data
const AgendaInfo = ({
  agendaInfo,
  idx,
}: {
  agendaInfo: AgendaDataProps;
  idx: number;
}) => {
  if (!agendaInfo) {
    return <div>There is no agenda</div>;
  }
  const startDate = new Date(agendaInfo.agendaStartTime);
  const endDate = new Date(agendaInfo.agendaEndTime);

  return (
    <div className={styles.agendaInfoContainer} key={idx}>
      <div className={styles.agendaDateBox}>
        <div className={styles.agendaStartDateMonth}>
          {fillZero(`${startDate.getMonth()}`, 2)}
        </div>

        <div className={styles.agendaStartDateDay}>
          {fillZero(`${startDate.getDate()}`, 2)}
        </div>
      </div>

      <div className={styles.agendaInfoWrapper}>
        <div className={styles.agendaItemTitleBox}>
          {agendaInfo.agendaTitle}
        </div>
        <div className={styles.agendaItemTimeBox}>
          <div className={styles.agendaItemTimeWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src='/image/agenda/Time.svg'
                width={15}
                height={15}
                alt='Time'
                className={styles.imageBox}
              />
            </div>
            <div>{showPeriod({ startDate, endDate })}</div>
          </div>

          <div className={styles.agendaItemTimeWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={'/image/agenda/Time.svg'}
                width={15}
                height={15}
                alt='count'
                className={styles.imageBox}
              />
            </div>
            <div>
              {agendaInfo.agendaCurrentTeam}/{agendaInfo.agendaMaxTeam}
            </div>
          </div>
        </div>

        <div className={styles.agendaItemTagBox}>
          {agendaInfo.isOfficial && <AgendaTag tagName='공식' />}
          {isSoloTeam(
            agendaInfo.agendaMinPeople,
            agendaInfo.agendaMaxPeople
          ) ? (
            <AgendaTag tagName='개인' />
          ) : (
            <AgendaTag tagName='팀' />
          )}
          {agendaInfo.isRanking && <AgendaTag tagName='대회' />}
        </div>
      </div>
    </div>
  );
};

export default AgendaInfo;
