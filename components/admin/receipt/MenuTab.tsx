import { useEffect, useState } from 'react';
import MegaphoneList from 'components/admin/receipt/MegaphoneList';
import ProfileList from 'components/admin/receipt/ProfileList';
import ReceiptList from 'components/admin/receipt/ReceiptList';
import styles from 'styles/admin/receipt/MenuTab.module.scss';

function MenuTab() {
  const [tabIdx, setTabIdx] = useState(0);
  const [child, setChild] = useState(<ReceiptList />);
  const tabContents = [
    {
      contentId: 0,
      contentName: '구매 내역',
    },
    {
      contentId: 1,
      contentName: '확성기 사용 내역',
    },
    {
      contentId: 2,
      contentName: '프로필 변경권 사용 내역',
    },
  ];

  useEffect(() => {
    if (tabIdx === 0) setChild(<ReceiptList />);
    if (tabIdx === 1) setChild(<MegaphoneList />);
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
