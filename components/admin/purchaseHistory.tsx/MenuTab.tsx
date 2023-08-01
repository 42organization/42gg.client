import { useEffect, useState } from "react";
import PurchaseList from "./PurchaseList";
import MegaphoneList from "./MegaphoneList";
import ProfileList from "./ProfileList";


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
            {tabContents.map((content, idx) => {
                return (
                    <button key={idx} onClick={() => setTab(content)}>
                        {content}
                    </button>
                )
            })}
            {child}
        </>
    )


}

export default MenuTab;