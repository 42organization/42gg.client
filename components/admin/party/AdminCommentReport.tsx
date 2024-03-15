import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyCommentReport } from 'types/partyTypes';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import { useAdminPartyCommentReport } from 'hooks/party/useAdminPartyComment';
import styles from 'styles/admin/Party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterIntraId: '신고자 이름',
  commentsId: '댓글 번호',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminCommentReport() {
  const { commentReports } = useAdminPartyCommentReport();

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>댓글 신고리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyCommentReport'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {commentReports.map((rc) => (
              <TableRow key={rc.id} className={styles.tableRow}>
                {tableFormat['partyCommentReport'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {rc[columnName as keyof PartyCommentReport]?.toString()}
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
