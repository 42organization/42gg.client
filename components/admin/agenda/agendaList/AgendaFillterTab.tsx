import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/admin/takgu/usageHistory/MenuTab.module.scss';
import AgendaTable from './AgendaTable';

export default function AgendaFillterTab() {
  const [tabIdx, setTabIdx] = useState(0);
  const [child, setChild] = useState(<AgendaTable />);
  const tabContents = [
    {
      contentId: 0,
      contentName: '전체',
    },
    {
      contentId: 1,
      contentName: '모집 중',
    },
    {
      contentId: 2,
      contentName: '진행 중',
    },
    {
      contentId: 3,
      contentName: '진행 완료',
    },
  ];

  useEffect(() => {
    switch (tabIdx) {
      case 0:
        setChild(<AgendaTable />);
        break;
      case 1:
        setChild(<AgendaTable status={AgendaStatus.OPEN} />);
        break;
      case 2:
        setChild(<AgendaTable status={AgendaStatus.CONFIRM} />);
        break;
      case 3:
        setChild(<AgendaTable status={AgendaStatus.FINISH} />);
        break;
    }
  }, [tabIdx]);

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.tabMenu}>
        {tabContents.map((content) => (
          <li
            key={content.contentId}
            className={
              tabIdx === content.contentId ? styles.active : styles.inactive
            }
            onClick={() => setTabIdx(content.contentId)}
          >
            {content.contentName}
          </li>
        ))}
      </ul>
      <div className={styles.subContainer}>{child}</div>
    </div>
  );
}
