import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomReport } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/party/PartyMain.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterId: '신고자 이름',
  reporteeId: '피신고자 이름',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function PartyRoomReport() {
  const [noRoomReport, setRoomReport] = useState<PartyRoomReport[]>([]);

  useEffect(() => {
    mockInstance
      .get('/party/admin/reports/rooms')
      .then(({ data }: { data: PartyRoomReport[] }) => {
        setRoomReport(data);
      });
  }, []);

  const deleteRoomReport = (room_id: number, user_id: string) => {
    mockInstance.delete(`/party/reports/rooms/${room_id}`).catch((error) => {
      console.error('방 신고 삭제 중 오류가 발생했습니다:', error);
    });
  };
  console.log(
    tableFormat['partyRoomReport'].columns.map(
      (columnName) => tableTitle[columnName]
    )
  );
  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>방 신고리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyRoomReport'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {noRoomReport.map((r) => (
              <TableRow key={r.id} className={styles.tableRow}>
                {tableFormat['partyRoomReport'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {columnName === 'delete' ? (
                        <button
                          onClick={() =>
                            deleteRoomReport(r.roomId, r.reporteeId)
                          }
                        >
                          삭제
                        </button>
                      ) : (
                        r[columnName as keyof PartyRoomReport]?.toString()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
