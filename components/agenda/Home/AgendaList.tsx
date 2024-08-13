import Link from 'next/link';
import React from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = () => {
  const agendaList = useFetchGet<AgendaDataProps[]>(`/list`, [])?.data;
  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListTextWrapper}>AGENDA LIST</div>
      <div className={styles.agendaListItemContainer}>
        {agendaList && agendaList.length > 0 ? (
          agendaList.map((agendaInfo, idx) => (
            <AgendaListItem agendaInfo={agendaInfo} key={idx} />
          ))
        ) : (
          <div>There is no agenda</div>
        )}
      </div>
    </div>
  );
};

const AgendaListItem = ({
  agendaInfo,
  key,
}: {
  agendaInfo: AgendaDataProps;
  key: number;
}) => {
  return (
    <Link href={`/agenda/${agendaInfo.agendaKey}`}>
      <button className={styles.agendaListItemBtn} key={key}>
        <AgendaInfo agendaInfo={agendaInfo} key={key} />
        <AgendaDeadLine />
      </button>
    </Link>
  );
};

export default AgendaList;
