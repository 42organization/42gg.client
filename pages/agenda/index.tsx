import React, { useRef, useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import { TestModal, TestModal2 } from 'components/agenda/modal/testModal';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Home/Agenda.module.scss';
import listStyles from 'styles/agenda/Home/AgendaList.module.scss';

const Agenda: NextPage = () => {
  const [showCurrent, setShowCurrent] = useState<boolean>(true);

  const { PagaNationElementProps, content: historyData } =
    usePageNation<AgendaDataProps>({
      url: '/history',
    });

  const { data: currentData } = useFetchGet<AgendaDataProps[]>('/list');
  const toggleStatus = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const status = showCurrent ? 'ongoing' : 'closed';
    if ((target && target.name === status) || !target.name) return;
    setShowCurrent(target.name === 'ongoing');
  };

  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <MyAgendaBtn />
      <div className={listStyles.agendaListTextWrapper}>
        <h2>AGENDA LIST</h2>
        <div>
          <button
            className={`${listStyles.agendaListStatus} ${
              showCurrent ? listStyles.selectedStatus : ''
            }`}
            name='ongoing'
            onClick={toggleStatus}
          >
            진행중
          </button>
          {' | '}
          <button
            className={`${listStyles.agendaListStatus} 
            ${showCurrent ? '' : listStyles.selectedStatus}`}
            name='closed'
            onClick={toggleStatus}
          >
            종료된
          </button>
        </div>
      </div>

      {showCurrent ? (
        <AgendaList agendaList={currentData || []} />
      ) : (
        <>
          <AgendaList agendaList={historyData || []} />
          <PageNation {...PagaNationElementProps} />{' '}
        </>
      )}
      <TestModal />
      <TestModal2 />
    </div>
  );
};

export default Agenda;
