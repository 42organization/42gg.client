import { useState } from 'react';
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

interface PageControllerProps {
  compArray: React.ReactNode[];
}

const PageController = ({ compArray }: PageControllerProps) => {
  const [current, setCurrent] = useState(0);
  const max = compArray.length;

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
      {compArray[current]}
      <PageControllerNavigator
        currentPage={current}
        maxPage={compArray.length}
        onClick={setCurrent}
      />
    </div>
  );
};

export default PageController;
