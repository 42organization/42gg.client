import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomColumn } from 'types/takgu/admin/adminPartyTypes';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/takgu/modal';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import AdminSearchBar from 'components/takgu/admin/common/AdminSearchBar';
import { AdminTableHead } from 'components/takgu/admin/common/AdminTable';
import useAdminPartyRoomList from 'hooks/takgu/party/useAdminPartyRoomList';
import styles from 'styles/takgu/admin/party/AdminPartyCommon.module.scss';

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
  const [currentPage, setCurrentPage] = useState(1);
  const { partyRooms, totalPages } = useAdminPartyRoomList({
    page: currentPage,
  });
  // const [searchKeyword, setSearchKeyword] = useState('');

  const rooms: PartyRoomColumn[] = partyRooms.map((room) => ({
    roomId: room.roomId,
    title: room.title,
    categoryName: room.categoryName,
    createDate: dateToStringShort(new Date(room.createDate)),
    dueDate: dateToStringShort(new Date(room.dueDate)),
    creatorIntraId: room.creatorIntraId ?? '',
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
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label='partyRoomTable' className={styles.table}>
          <AdminTableHead tableName={'partyRoom'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {rooms.map((room) => (
              <TableRow key={room.roomId}>
                {tableFormat['partyRoom'].columns.map((columnName) => (
                  <TableCell key={columnName} className={styles.tableBodyItem}>
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
                        className={`${styles.button_1} ${styles.edit}`}
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
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={currentPage}
          totalPages={totalPages}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
