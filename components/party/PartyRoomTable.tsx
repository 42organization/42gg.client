import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomColumn } from 'types/admin/adminParty';
import { dateToStringShort } from 'utils/handleTime';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/party/PartyMain.module.scss';
import PartyRoomEdit from './PartyRoomEdit';

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
  const [modal, setModal] = useState<number>();
  const { categorys } = usePartyCategory();
  const { partyRooms, updateRoomsByTitle } = usePartyRoom({ isAdmin: true });
  const [searchKeyword, setSearchKeyword] = useState('');

  const rooms: PartyRoomColumn[] = partyRooms.map((room) => ({
    roomId: room.roomId,
    title: room.title,
    categoryName:
      categorys?.find((c) => c.categoryId === room.categoryId)?.categoryName ??
      '???',
    createDate: dateToStringShort(new Date(room.createDate)),
    dueDate: dateToStringShort(new Date(room.dueDate)),
    creatorIntraId: room.creatorIntraId ?? '작성자intra',
    roomStatus: room.roomStatus,
  }));

  return (
    <>
      {!modal ? (
        <div className={styles.userManagementWrap}>
          <div className={styles.header}>
            <span className={styles.title}>파티방 관리</span>
            {/* 검색어 intraId로 되어있는거 보류 */}
            <AdminSearchBar
              initSearch={(keyword) => {
                setSearchKeyword(keyword ?? '');
                updateRoomsByTitle(searchKeyword);
              }}
            />
          </div>
          {/* 미리 합쳐진 컴포넌트 쓰면 좋을듯*/}
          <TableContainer className={styles.tableContainer} component={Paper}>
            <Table className={styles.table} aria-label='UserManagementTable'>
              {/* 중복으로 tableRoom의 type이 정의됨 */}
              <AdminTableHead tableName={'partyRoom'} table={tableTitle} />
              <TableBody className={styles.tableBody}>
                {rooms.map((room) => (
                  <TableRow key={room.roomId} className={styles.tableRow}>
                    {tableFormat['partyRoom'].columns.map((columnName) => (
                      <TableCell
                        className={styles.tableBodyItem}
                        key={columnName}
                      >
                        {columnName !== 'etc' ? (
                          <div>
                            {room[columnName as keyof PartyRoomColumn] ??
                              '없음'}
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setModal(room.roomId);
                            }}
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
      ) : (
        <PartyRoomEdit roomId={modal} />
      )}
    </>
  );
}
