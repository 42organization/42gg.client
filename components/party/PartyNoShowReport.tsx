import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyNoshowReport } from 'types/partyTypes';
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

export default function PartyNoShowReport() {
  const [noShowReport, setNoShowReport] = useState<PartyNoshowReport[]>([]);

  useEffect(() => {
    mockInstance
      .get('/party/admin/reports/users')
      .then(({ data }: { data: PartyNoshowReport[] }) => {
        setNoShowReport(data);
      });
  }, []);

  const deleteNoshowReport = (roomId: number, userId: string) => {
    mockInstance
      .delete(`/party/reports/rooms/${roomId}/users/${userId}`)
      .catch((error) => {
        console.error('카테고리 삭제 중 오류가 발생했습니다:', error);
      });
  };
  console.log(
    tableFormat['partyNoshowReport'].columns.map(
      (columnName) => tableTitle[columnName]
    )
  );
  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>노쇼 신고리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyNoshowReport'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {noShowReport.map((rn) => (
              <TableRow key={rn.id} className={styles.tableRow}>
                {tableFormat['partyNoshowReport'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {columnName === 'delete' ? (
                        <button
                          onClick={() =>
                            deleteNoshowReport(rn.roomId, rn.reporteeId)
                          }
                        >
                          삭제
                        </button>
                      ) : (
                        rn[columnName as keyof PartyNoshowReport]?.toString()
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
