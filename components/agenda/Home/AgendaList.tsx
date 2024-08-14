import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = () => {
  const view = useRef<string>('ongoing');
  const loadingStatus = useRef<boolean>(true);
  const [agendaList, setAgendaList] = useState<AgendaDataProps[]>([]);

  const fetchAgendaList = async () => {
    const url = view.current === 'ongoing' ? '/list' : '/list/history';
    const data = await instanceInAgenda
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.view === 403) return [];
        else return []; // 에러처리 필요 ERROR
      });
    loadingStatus.current = false;
    setAgendaList(data);
  };
  function getSelectedButtonElem() {
    return view.current === 'ongoing'
      ? document.getElementsByName('ongoing')[0]
      : document.getElementsByName('closed')[0];
  }
  useEffect(() => {
    const selected = getSelectedButtonElem();

    selected.classList.add(`${styles.selectedStatus}`);
    loadingStatus.current = true;
    fetchAgendaList();
  }, []);
  const toggleStatus = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if ((target && target.name === view.current) || !target.name) return;
    const selected = getSelectedButtonElem();
    selected.classList.remove(`${styles.selectedStatus}`);
    target.classList.add(`${styles.selectedStatus}`);
    view.current = target.name;
    fetchAgendaList();
  };

  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListTextWrapper}>
        <h2>AGENDA LIST</h2>
        <div>
          <button
            className={`${styles.agendaListStatus}`}
            name='ongoing'
            onClick={toggleStatus}
          >
            진행중
          </button>
          {' | '}
          <button
            className={`${styles.agendaListStatus}`}
            name='closed'
            onClick={toggleStatus}
          >
            종료된
          </button>
        </div>
      </div>
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
