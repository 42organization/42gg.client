import Link from 'next/link';
import React from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = ({ agendaList }: { agendaList: AgendaDataProps[] }) => {
  return (
    <div className={styles.agendaListContainer}>
      <div className={styles.agendaListItemContainer}>
        {!agendaList || !agendaList.length ? (
          <div>
            <div className={styles.emptyContainer}>일정이 없습니다.</div>
          </div>
        ) : (
          agendaList.map((agendaInfo, idx) => (
            <AgendaListItem agendaInfo={agendaInfo} key={idx} />
          ))
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
  agendaInfo.agendaPosterUrl =
    agendaInfo.agendaPosterUrl || '/image/agenda/42.jpg';
  return (
    <Link href={`/agenda/${agendaInfo.agendaKey}`}>
      <button
        className={styles.agendaListItemBtn}
        style={{
          background: `linear-gradient(180deg, #fff 5rem, rgba(0, 0, 0, 0) 10rem), url(${agendaInfo.agendaPosterUrl})`,
        }}
        key={key}
      >
        <AgendaInfo agendaInfo={agendaInfo} key={key} />
        <AgendaDeadLine />
      </button>
    </Link>
  );
};

export default AgendaList;
