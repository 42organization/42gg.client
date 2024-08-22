import React, { useRef, useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import { TestModal, TestModal2 } from 'components/agenda/modal/testModal';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/Home/Agenda.module.scss';
import listStyles from 'styles/agenda/Home/AgendaList.module.scss';

const Agenda: NextPage = () => {
  const [view, setView] = useState<boolean>(false);

  const url = view ? '/history' : '/list';
  const { PagaNationElementProps, content, loadingStatus } =
    usePageNation<AgendaDataProps>({
      url: url,
    });

  const toggleStatus = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const status = view ? 'closed' : 'ongoing';
    if ((target && target.name === status) || !target.name) return;
    loadingStatus.current = true;
    setView(target.name === 'closed');
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
              view ? '' : listStyles.selectedStatus
            }`}
            name='ongoing'
            onClick={toggleStatus}
          >
            진행중
          </button>
          {' | '}
          <button
            className={`${listStyles.agendaListStatus} ${
              view ? listStyles.selectedStatus : ''
            }`}
            name='closed'
            onClick={toggleStatus}
          >
            종료된
          </button>
        </div>
      </div>
      <AgendaList loadingStatus={loadingStatus} agendaList={content || []} />

      {view && <PageNation {...PagaNationElementProps} />}
      <TestModal />
      <TestModal2 />
    </div>
  );
};

export default Agenda;
