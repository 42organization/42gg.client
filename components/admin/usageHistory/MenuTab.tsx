import { useEffect, useState } from 'react';
import MegaphoneList from 'components/admin/usageHistory/MegaphoneList';
import ProfileList from 'components/admin/usageHistory/ProfileList';
import styles from 'styles/admin/usageHistory/MenuTab.module.scss';

function MenuTab() {
  const [tabIdx, setTabIdx] = useState(0);
  const [child, setChild] = useState(<MegaphoneList />);
  const tabContents = [
    {
      contentId: 0,
      contentName: '확성기 사용 내역',
    },
    {
      contentId: 1,
      contentName: '프로필 변경권 사용 내역',
    },
    {
      contentId: 2,
      contentName: '부적절한 프로필 삭제 내역',
    },
  ];

  useEffect(() => {
    if (tabIdx === 0) setChild(<MegaphoneList />);
    if (tabIdx === 1) setChild(<ProfileList />);
    if (tabIdx === 2) setChild(<ProfileList />);
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
