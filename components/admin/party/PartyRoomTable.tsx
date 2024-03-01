import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomTable } from 'types/admin/adminParty';
import { dateToStringShort } from 'utils/handleTime';
import { tableFormat } from 'constants/admin/table';
import PageNation from 'components/Pagination';
import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/party/PartyMain.module.scss';
import { AdminTableHead } from '../common/AdminTable';

const tableTitle: { [key: string]: string } = {
  roomId: 'ID',
  title: '제목',
  categoryName: '카테고리',
  createDate: '생성일',
  dueDate: '마감일',
  creatorIntraId: '작성자',
  roomState: '상태', // 숨김 보이기 표시
};

export default function PartyRoomTable() {
  const { partyRooms, categorys } = usePartyRoom();

  const rooms: PartyRoomTable[] = partyRooms.map((room) => ({
    roomId: room.roomId,
    title: room.title,
    categoryName:
      categorys.find((c) => c.categoryId === room.categoryId)?.categoryName ??
      '???',
    createDate: dateToStringShort(new Date(room.createDate)),
    dueDate: dateToStringShort(new Date(room.dueDate)),
    creatorIntraId: '작성자',
    roomState: room.roomState,
  }));

  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>파티방 관리</span>
        {/* <AdminSearchBar initSearch={initSearch} /> */}
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyRoom'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {rooms.map((room) => (
              <TableRow key={room.roomId} className={styles.tableRow}>
                {tableFormat['partyRoom'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {/* <div key={room.roomId}>{room[columnName] ?? '없음'}</div> */}
                    </TableCell>
                  );
                })}
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
