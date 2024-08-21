import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import styles from 'styles/agenda/utils/PageController.module.scss';
import AgendaInfo from '../Home/AgendaInfo';

interface PageControllerNavigatorProps {
  currentPage: number;
  maxPage: number;
  onClick: (page: number) => void;
}

const PageControllerNavigator = ({
  currentPage,
  maxPage,
  onClick,
}: PageControllerNavigatorProps) => {
  const buttons = [];
  for (let i = 0; i < maxPage; i++) {
    if (i === currentPage)
      buttons.push(
        <button key={i} onClick={() => onClick(i)} className={styles.current} />
      );
    else
      buttons.push(
        <button key={i} onClick={() => onClick(i)} className={styles.rest} />
      );
  }
  return (
    <div className={styles.navContainer}>{buttons.map((button) => button)}</div>
  );
};

const PageController = ({
  handleNavigation,
}: {
  handleNavigation: (path: string) => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<AgendaDataProps[]>([]);
  const max = data.length;

  const fetchAgendaList = async () => {
    const url = '/list';
    const data = await instanceInAgenda
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.view === 403) return [];
        else return []; // 에러처리 필요 ERROR
      });
    return data;
  };

  useEffect(() => {
    fetchAgendaList().then((data) => {
      setData(data);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(moveNext, 2000);
    return () => clearInterval(interval);
  });

  function moveNext() {
    setCurrent(current + 1 < max ? current + 1 : 0);
  }
  function movePrev() {
    setCurrent(current - 1 >= 0 ? current - 1 : max - 1);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.agendaInfoContainer}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          console.log(target);
          if (
            target.className.includes(styles.moveButton) ||
            target.closest(styles.moveButton)
          )
            return;
          data.length && data[current]
            ? handleNavigation('/agenda/' + data[current].agendaKey)
            : null;
        }}
      >
        <button
          onClick={movePrev}
          className={`${styles.moveButton} ${styles.moveButtonPrev}`}
        >
          <div className={styles.prev} />
        </button>
        <button
          className={`${styles.moveButton} ${styles.moveButtonNext}`}
          onClick={moveNext}
        >
          <div className={styles.next} />
        </button>
        <AgendaInfo agendaInfo={data[current]} key={current || 0} />
      </button>
      <PageControllerNavigator
        currentPage={current}
        maxPage={data.length}
        onClick={setCurrent}
      />
    </div>
  );
};

export default PageController;