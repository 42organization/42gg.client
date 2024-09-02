import React, { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Home/Agenda.module.scss';
import listStyles from 'styles/agenda/Home/AgendaList.module.scss';

const Agenda: NextPage = () => {
  const [showCurrent, setShowCurrent] = useState<string>('open');

  const { PagaNationElementProps, content: historyData } =
    usePageNation<AgendaDataProps>({
      url: '/history',
    });

  const { data: currentData } = useFetchGet<AgendaDataProps[]>('/confirm');
  const { data: openData } = useFetchGet<AgendaDataProps[]>('/open');
  const toggleStatus = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const status = showCurrent ? 'ongoing' : 'closed';
    if ((target && target.name === status) || !target.name) return;
    // setShowCurrent(target.name === 'ongoing');
  };

  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <div className={styles.agendaContainer}>
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

        {showCurrent !== 'history' ? (
          <AgendaList
            agendaList={
              showCurrent === 'open' ? openData || [] : currentData || []
            }
          />
        ) : (
          <>
            <AgendaList agendaList={historyData || []} />
            <PageNation {...PagaNationElementProps} />{' '}
          </>
        )}
      </div>
    </div>
  );
};

export default Agenda;
