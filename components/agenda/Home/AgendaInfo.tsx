import Image from 'next/image';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import styles from 'styles/agenda/Home/AgendaInfo.module.scss';

// Props: API data
const AagendaInfo = () => {
  return (
    <div className={styles.agendaInfoContainer}>
      <div className={styles.agendaDateBox}>
        <div className={styles.agendaDateMonth}>12</div>
        <div className={styles.agendaDateDay}>31</div>
      </div>

      <div className={styles.agendaInfoWrapper}>
        <div className={styles.agendaItemTitleBox}>PUSH SWAP 경진대회</div>

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
            <div>12.31</div>
            <div>14:00 ~ 17:00</div>
          </div>

          <div className={styles.agendaItemTimeWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src='/image/agenda/People.svg'
                width={15}
                height={15}
                alt='count'
                className={styles.imageBox}
              />
            </div>
            <div>20/100</div>
          </div>
        </div>

        <div className={styles.agendaItemTagBox}>
          <AgendaTag tagName='공식' />
          <AgendaTag tagName='팀' />
          <AgendaTag tagName='과제' />
        </div>
      </div>
    </div>
  );
};

export default AagendaInfo;
