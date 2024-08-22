import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = ({
  loadingStatus,
  agendaList,
}: {
  loadingStatus: { current: boolean };
  agendaList: AgendaDataProps[];
}) => {
  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListItemContainer}>
        {loadingStatus.current === true ? (
          <div>
            <div className={styles.emptyContainer}>Loading...</div>
          </div>
        ) : agendaList && agendaList.length > 0 ? (
          agendaList.map((agendaInfo, idx) => (
            <AgendaListItem agendaInfo={agendaInfo} key={idx} />
          ))
        ) : (
          <div className={styles.emptyContainer}>일정이 없습니다.</div>
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
