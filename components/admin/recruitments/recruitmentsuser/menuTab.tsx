import { useEffect, useState } from 'react';
import RecruitmentsHistoryList from 'components/admin/recruitments/recruitmentsHistoryList';
import DetailRecruitUserList from 'components/admin/recruitments/recruitmentsuser/detailRecruitUserList';
import NotificationResults from 'components/admin/recruitments/recruitmentsuser/notificationResults';
import styles from 'styles/admin/recruitments/MenuTab.module.scss';

function MenuTab({ recruitId }: { recruitId: number }) {
  const [view, setView] = useState('menu');
  const [tabIdx, setTabIdx] = useState(0);
  const [child, setChild] = useState(
    <DetailRecruitUserList recruitId={recruitId} />
  );
  const tabContents = [
    {
      contentId: 0,
      contentName: '상세정보',
    },
    {
      contentId: 1,
      contentName: '결과 입력',
    },
  ];

  useEffect(() => {
    switch (tabIdx) {
      case 0:
        setChild(<DetailRecruitUserList recruitId={recruitId} />);
        break;
      case 1:
        setChild(<NotificationResults recruitId={recruitId} />);
        break;
    }
  }, [tabIdx, recruitId]);

  return (
    <>
      {view === 'history' ? (
        <RecruitmentsHistoryList />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <button className={styles.back} onClick={() => setView('history')}>
              🔙
            </button>
            <ul className={styles.tabMenu}>
              {tabContents.map((content) => (
                <li
                  key={content.contentId}
                  className={
                    tabIdx === content.contentId
                      ? styles.active
                      : styles.inactive
                  }
                  onClick={() => setTabIdx(content.contentId)}
                >
                  {content.contentName}
                </li>
              ))}
            </ul>
            <div className={styles.subContainer}>{child}</div>
          </div>
        </>
      )}
    </>
  );
}

export default MenuTab;
