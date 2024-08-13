import Image from 'next/image';
import { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Home/MyAgendaBtn.module.scss';

const MyAgendaBtn = () => {
  const [widthExpanded, setWidthExpanded] = useState(false);
  const [heightExpanded, setHeightExpanded] = useState(false);
  const [expanding, setExpanding] = useState(false);

  const handleClick = () => {
    if (expanding) return;
    setExpanding(true);

    if (widthExpanded) {
      setHeightExpanded(false);
      setTimeout(() => {
        setWidthExpanded(false);
        setExpanding(false);
      }, 200);
    } else {
      setWidthExpanded(true);
      setTimeout(() => {
        setHeightExpanded(true);
        setExpanding(false);
      }, 200);
    }
  };
  const myList =
    useFetchGet<AgendaDataProps[]>('/profile/current/list')?.data || [];

  return (
    <div
      className={`${styles.myAgendaContainer} ${
        widthExpanded ? styles.expandedWidth : ''
      } ${heightExpanded ? styles.expandedHeight : ''}`}
    >
      <div className={styles.myAgendaBtnToggle} onClick={handleClick}>
        <div className={styles.myAgendaText}>my agenda</div>
        <div className={styles.imageWrapper}>
          <Image
            src='/image/agenda/ChevronRight.svg'
            width={35}
            height={35}
            alt='Go To My Agenda'
            className={`${styles.imageBox} ${
              widthExpanded ? styles.rotateDown : ''
            }`}
          />
        </div>
      </div>

      <div className={styles.myAgendaListContainer}>
        {myList.length > 0 ? (
          myList.map((agendaInfo, idx) => (
            <div className={styles.myagendaItemContainer} key={idx}>
              <AgendaInfo agendaInfo={agendaInfo} key={idx} />
            </div>
          ))
        ) : (
          <div className={styles.noAgendaText}>There is no agenda</div>
        )}
      </div>
    </div>
  );
};

export default MyAgendaBtn;
