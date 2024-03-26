import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomColumn } from 'types/admin/adminPartyTypes';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import useAdminPartyRoomList from 'hooks/party/useAdminPartyRoomList';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/admin/party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  roomId: 'ID',
  title: '제목',
  categoryName: '카테고리',
  createDate: '생성일',
  dueDate: '마감일',
  creatorIntraId: '작성자',
  roomStatus: '상태', // 숨김 보이기 표시
  etc: '기타',
};

export default function PartyRoomTable() {
  const setModal = useSetRecoilState(modalState);
  const { categories } = usePartyCategory();
  const { partyRooms } = useAdminPartyRoomList();
  // const [searchKeyword, setSearchKeyword] = useState('');

  const rooms: PartyRoomColumn[] = partyRooms.map((room) => ({
    roomId: room.roomId,
    title: room.title,
    categoryName:
      categories?.find((c) => c.categoryName === room.categoryName)
        ?.categoryName ?? '???',
    createDate: dateToStringShort(new Date(room.createDate)),
    dueDate: dateToStringShort(new Date(room.dueDate)),
    creatorIntraId: room.creatorIntraId ?? '작성자intra',
    roomStatus: room.status,
  }));

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>파티방 관리</span>
        {/* <AdminSearchBar
          initSearch={(keyword) => {
            setSearchKeyword(keyword ?? '');
            // updateRoomsByTitle(searchKeyword);
          }}
        /> */}
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='partyRoomTable'>
          <AdminTableHead tableName={'partyRoom'} table={tableTitle} />
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.roomId}>
                {tableFormat['partyRoom'].columns.map((columnName) => (
                  <TableCell key={columnName}>
                    {columnName !== 'etc' ? (
                      <div>
                        {room[columnName as keyof PartyRoomColumn] ?? '없음'}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setModal({
                            modalName: 'ADMIN-PARTY_EDIT',
                            roomId: room.roomId,
                          });
                        }}
                        className={styles.button_1}
                      >
                        자세히
                      </button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className={styles.pageNationContainer}>
        <PageNation
          curPage={userManagements.currentPage}
          totalPages={userManagements.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div> */}
    </div>
  );
}
