import Link from 'next/link';
import React from 'react';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = () => {
  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListTextWrapper}>AGENDA LIST</div>
      <div className={styles.agendaListItemContainer}>
        <AgendaListItem />
        <AgendaListItem />
      </div>
    </div>
  );
};

const AgendaListItem = () => {
  return (
    <Link href={`/agenda/1`}>
      <button className={styles.agendaListItemBtn}>
        <AgendaInfo />
        <AgendaDeadLine />
      </button>
    </Link>
  );
};

export default AgendaList;
