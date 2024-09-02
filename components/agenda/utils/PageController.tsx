import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/utils/PageController.module.scss';

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
      <div
        className={styles.agendaInfoContainer}
        style={{
          background: `linear-gradient(180deg, #fff 7rem, rgba(0, 0, 0, 0) 10rem), url(${
            data[current]?.agendaPosterUrl || '/image/agenda/42.jpg'
          }) lightgray 50% / cover no-repeat`,
        }}
      >
        <button
          onClick={movePrev}
          className={`${styles.moveButton} ${styles.moveButtonPrev}`}
        >
          <div className={styles.prev} />
        </button>
        <button
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.className.includes(styles.moveButton) ||
              target.closest(styles.moveButton)
            )
              return;
            data.length && data[current]
              ? handleNavigation('/agenda/' + data[current].agendaKey)
              : null;
          }}
          className={styles.toClick}
        />

        <button
          className={`${styles.moveButton} ${styles.moveButtonNext}`}
          onClick={moveNext}
        >
          <div className={styles.next} />
        </button>
        <AgendaInfo agendaInfo={data[current]} idx={current || 0} />
      </div>
      <PageControllerNavigator
        currentPage={current}
        maxPage={data.length}
        onClick={setCurrent}
      />
    </div>
  );
};

export default PageController;
