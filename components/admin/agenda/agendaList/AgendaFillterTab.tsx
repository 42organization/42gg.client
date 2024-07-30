import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import MegaphoneList from 'components/admin/takgu/usageHistory/MegaphoneList';
import ProfileDeleteHistoryList from 'components/admin/takgu/usageHistory/ProfileDeleteHistoryList';
import ProfileList from 'components/admin/takgu/usageHistory/ProfileList';
import ProfileListCurrent from 'components/admin/takgu/usageHistory/ProfileListCurrent';
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
      contentName: '공식',
    },
    {
      contentId: 2,
      contentName: '비공식',
    },
    {
      contentId: 3,
      contentName: '완료된 대회',
    },
  ];

  useEffect(() => {
    switch (tabIdx) {
      case 0:
        setChild(<AgendaTable />);
        break;
      case 1:
        setChild(<AgendaTable isOfficial={true} />);
        console.log('공식');
        break;
      case 2:
        setChild(<AgendaTable isOfficial={false} />);
        break;
      case 3:
        setChild(<AgendaTable status={AgendaStatus.CONFIRM} />);
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
