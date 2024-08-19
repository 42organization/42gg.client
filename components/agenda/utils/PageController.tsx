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

const PageController = () => {
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

  return (
    <div className={styles.container}>
      <button
        className={styles.prev}
        onClick={() => setCurrent(current - 1 >= 0 ? current - 1 : max - 1)}
      />
      <button
        className={styles.next}
        onClick={() => setCurrent(current + 1 < max ? current + 1 : 0)}
      />
      <div className={styles.agendaInfoContainer}>
        <AgendaInfo agendaInfo={data[current]} key={current || 0} />
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
