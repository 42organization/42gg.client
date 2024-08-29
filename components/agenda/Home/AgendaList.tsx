import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = ({ agendaList }: { agendaList: AgendaDataProps[] }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  return (
    <div className={styles.container}>
      <div className={styles.agendaListContainer}>
        <div className={styles.agendaListItemContainer}>
          {!agendaList || !agendaList.length ? (
            <div>
              <div className={styles.emptyContainer}>일정이 없습니다.</div>
            </div>
          ) : (
            agendaList.map((agendaInfo, idx) => {
              agendaInfo.idx = idx;
              return (
                <AgendaListItem
                  agendaInfo={agendaInfo}
                  key={idx}
                  type='list'
                  className={idx === selectedItem ? styles.selected : ''}
                  setSelectedItem={setSelectedItem}
                />
              );
            })
          )}
        </div>
      </div>
      {agendaList.length && (
        <AgendaListItem
          agendaInfo={agendaList[selectedItem || 0]}
          key={selectedItem || 0}
          type='big'
        />
      )}
    </div>
  );
};

const AgendaListItem = ({
  agendaInfo,
  key,
  type,
  className,
  setSelectedItem,
}: {
  agendaInfo: AgendaDataProps;
  key: number;
  type?: string;
  className?: string;
  setSelectedItem?: (key: number) => void;
}) => {
  const router = useRouter();
  const href = `/agenda/${agendaInfo.agendaKey}`;
  return (
    <button
      className={`${styles.agendaListItemBtn} ${
        type === 'list' && styles.listType
      } ${type === 'big' && styles.listBig}
       ${className && className}`}
      onClick={() => {
        if (window.innerWidth < 961) {
          router.push(href);
          return;
        }
        if (type === 'list' && setSelectedItem && agendaInfo.idx) {
          setSelectedItem(agendaInfo.idx);
          return;
        }
        router.push(href);
      }}
    >
      <AgendaInfo agendaInfo={agendaInfo} key={key} />
      <AgendaDeadLine />
    </button>
  );
};

export default AgendaList;
