import { useEffect, useState } from "react";
import PurchaseList from "./PurchaseList";
import MegaphoneList from "./MegaphoneList";
import ProfileList from "./ProfileList";
import styles from "styles/admin/purchaseHistory/MenuTab.module.scss";

function MenuTab() {

    const tabContents = [
        {
            contentId: 0,
            contentName: '구매내역',
        },
        {
            contentId: 1,
            contentName: '확성기',
        },
        {
            contentId: 2,
            contentName: '프로필',
        }
    ];

    const [tabIdx, setTabIdx] = useState(0);
    
    const [child, setChild] = useState(<PurchaseList/>);

    useEffect(() => {
        if (tabIdx === 0)
            setChild(<PurchaseList/>);
        if (tabIdx === 1)
            setChild(<MegaphoneList/>);
        if (tabIdx === 2)
            setChild(<ProfileList/>);
    }, [tabIdx]);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h2>거래내역 관리</h2>
            </div>
            <ul className={styles.tabMenu}>
                {tabContents.map(content => (
                    <li key={content.contentId}
                    className={tabIdx === content.contentId ? styles.active : styles.inactive}
                    onClick={() => setTabIdx(content.contentId)}
                    >
                        {content.contentName}
                    </li>
                ))}
            </ul>
            <div className={styles.subContainer}>
                {child}
            </div>
        </div>
    )
}

export default MenuTab;