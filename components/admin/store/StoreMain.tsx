import ItemList from "./ItemList";
import ChangeHistory from "./changeHistory";



function StoreMain () {


    return (
        <>
            <h2>상점 관리</h2>
            <div>
                <h4>아이템 목록</h4>
                <ItemList />
            </div>
            <div>
                <h4>변경 이력</h4>
                <ChangeHistory />
            </div>
        </>
    )
}

export default StoreMain;