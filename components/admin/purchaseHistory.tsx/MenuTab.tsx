import { useEffect, useState } from "react";
import PurchaseList from "./PurchaseList";
import MegaphoneList from "./MegaphoneList";
import ProfileList from "./ProfileList";
import styles from "styles/admin/purchaseHistory/MenuTab.module.scss";

function MenuTab() {

    const tabContents = ['구매내역', '확성기', '프로필'];

    const [tab, setTab] = useState<string>('구매내역');

    const [child, setChild] = useState(<PurchaseList/>);

    useEffect(() => {
        if (tab === '구매내역')
            setChild(<PurchaseList/>);
        if (tab === '확성기')
            setChild(<MegaphoneList/>);
        if (tab === '프로필')
            setChild(<ProfileList/>);
    }, [tab]);

    return (
        <>
            <div className={styles.top}>
                <h2 className={styles.title}>
                    거래내역 관리
                </h2>
                <div className={styles.tab}>
                    {tabContents.map((content, idx) => {
                        return (
                            <button key={idx} onClick={() => setTab(content)}>
                                {content}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div>
                {child}
            </div>
        </>
    )


}

export default MenuTab;