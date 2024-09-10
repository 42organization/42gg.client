import Image from 'next/image';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { showPeriod } from 'utils/handleTime';
import AgendaTags from 'components/agenda/utils/AgendaTags';
import StartDate from 'components/agenda/utils/StartDate';
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
      {agendaInfo.agendaStartTime
        ? StartDate(agendaInfo.agendaStartTime as string)
        : ''}
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
                src={'/image/agenda/user.svg'}
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
        {AgendaTags(agendaInfo)}
      </div>
    </div>
  );
};

export default AgendaInfo;
