import { useEffect, useState } from 'react';
import MegaphoneList from 'components/admin/usageHistory/MegaphoneList';
import ProfileDeleteHistoryList from 'components/admin/usageHistory/ProfileDeleteHistoryList';
import ProfileList from 'components/admin/usageHistory/ProfileList';
import ProfileListCurrent from 'components/admin/usageHistory/ProfileListCurrent';
import styles from 'styles/admin/usageHistory/MenuTab.module.scss';

function MenuTab() {
  const [tabIdx, setTabIdx] = useState(0);
  const [child, setChild] = useState(<MegaphoneList />);
  const tabContents = [
    {
      contentId: 0,
      contentName: '확성기 사용내역',
    },
    {
      contentId: 1,
      contentName: '프로필 변경권 사용내역',
    },
    {
      contentId: 2,
      contentName: '현재 프로필 조회',
    },
    {
      contentId: 3,
      contentName: '프로필 삭제 내역',
    },
  ];

  useEffect(() => {
    switch (tabIdx) {
      case 0:
        setChild(<MegaphoneList />);
        break;
      case 1:
        setChild(<ProfileList />);
        break;
      case 2:
        setChild(<ProfileListCurrent />);
        break;
      case 3:
        setChild(<ProfileDeleteHistoryList />);
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

export default MenuTab;
