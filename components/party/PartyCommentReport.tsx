import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyCommentReport } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/party/PartyMain.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterId: '신고자 이름',
  commentsId: '댓글 번호',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function PartyCommentReport() {
  const [noCommentReport, setNoCommentReport] = useState<PartyCommentReport[]>(
    []
  );

  useEffect(() => {
    mockInstance
      .get('/party/admin/reports/comments')
      .then(({ data }: { data: PartyCommentReport[] }) => {
        setNoCommentReport(data);
      });
  }, []);

  const deleteRoomReport = (commentsId: number) => {
    mockInstance
      .delete(`/party/reports/comments/${commentsId}`)
      .catch((error) => {
        console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      });
  };
  console.log(
    tableFormat['partyCommentReport'].columns.map(
      (columnName) => tableTitle[columnName]
    )
  );
  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>댓글 신고리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyCommentReport'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {noCommentReport.map((rc) => (
              <TableRow key={rc.id} className={styles.tableRow}>
                {tableFormat['partyCommentReport'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {columnName === 'delete' ? (
                        <button onClick={() => deleteRoomReport(rc.commentsId)}>
                          삭제
                        </button>
                      ) : (
                        rc[columnName as keyof PartyCommentReport]?.toString()
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
