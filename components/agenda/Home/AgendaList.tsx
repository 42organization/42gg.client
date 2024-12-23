import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = ({
  agendaList,
  status,
}: {
  agendaList: AgendaDataProps[];
  status: AgendaStatus;
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  return (
    <>
      {!agendaList || !agendaList.length ? (
        <div className={styles.emptyContainer}>일정이 없습니다.</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.agendaListContainer}>
            <div className={styles.agendaListItemContainer}>
              {agendaList.map((agendaInfo, idx) => {
                agendaInfo.idx = idx;
                agendaInfo.agendaStatus = status;
                return (
                  <AgendaListItem
                    agendaInfo={agendaInfo}
                    key={idx}
                    idx={idx}
                    type='list'
                    className={idx === selectedItem ? styles.selected : ''}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })}
            </div>
          </div>
          <AgendaListItem
            agendaInfo={agendaList[selectedItem || 0]}
            idx={selectedItem || 0}
            type='big'
          />
        </div>
      )}
    </>
  );
};

const AgendaListItem = ({
  agendaInfo,
  idx,
  type,
  className,
  setSelectedItem,
}: {
  agendaInfo: AgendaDataProps;
  idx: number;
  type?: string;
  className?: string;
  setSelectedItem?: (key: number) => void;
}) => {
  const router = useRouter();
  const href = `/agenda/detail?agenda_key=${agendaInfo.agendaKey}`;
  return (
    <button
      className={`${styles.agendaListItemBtn} ${
        type === 'list' && styles.listType
      } ${type === 'big' && styles.listBig}
       ${className && className}`}
      style={{
        background: `linear-gradient(180deg, #fff 5rem, rgba(0, 0, 0, 0) 10rem), url(${
          agendaInfo.agendaPosterUrl || 'var(--default-bg)'
        }) lightgray 50% / cover no-repeat`,
      }}
      key={idx}
      onClick={() => {
        if (window.innerWidth < 961) {
          router.push(href);
          return;
        }
        if (
          type === 'list' &&
          setSelectedItem &&
          typeof agendaInfo.idx === 'number'
        ) {
          setSelectedItem(agendaInfo.idx);
          return;
        }
        router.push(href);
      }}
    >
      <AgendaInfo agendaInfo={agendaInfo} idx={idx} />
      <div className={`${type === 'list' && styles.show}`}>
        {agendaInfo.agendaStatus === 'CONFIRM' ? (
          <AgendaDeadLine
            deadLine={agendaInfo.agendaDeadLine}
            status={agendaInfo.agendaStatus}
            start={agendaInfo.agendaStartTime}
            end={agendaInfo.agendaEndTime}
          />
        ) : (
          <AgendaDeadLine
            deadLine={agendaInfo.agendaDeadLine}
            status={agendaInfo.agendaStatus}
          />
        )}
      </div>
    </button>
  );
};

export default AgendaList;
