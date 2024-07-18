import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = () => {
  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListTextWrapper}>AGENDA LIST</div>
      <div className={styles.agendaListItemContainer}>
        <AgendaListBtn />
        <AgendaListBtn />
      </div>
    </div>
  );
};

const AgendaListBtn = () => {
  return (
    <Link href={`/agenda/1`}>
      <button className={styles.agendaListItemBtn}>
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
        <div className={styles.agendaItemDeadLineBox}>
          <div className={styles.agendaDeadLineText}>모집마감</div>
          <div className={styles.agendaDeadLine}>D-2</div>
        </div>
      </button>
    </Link>
  );
};

export default AgendaList;
