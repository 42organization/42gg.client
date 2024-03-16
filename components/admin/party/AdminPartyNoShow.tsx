import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyNoshowReport } from 'types/partyTypes';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import { useAdminPartyNoshow } from 'hooks/party/useAdminPartyNoShow';
import styles from 'styles/admin/Party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterIntraId: '신고자 이름',
  reporteeIntraId: '피신고자 이름',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminPartyNoShow() {
  const { noShowReports } = useAdminPartyNoshow();

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>노쇼 신고리스트</span>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyNoshowReport'} table={tableTitle} />
          <TableBody>
            {noShowReports.map((rn) => (
              <TableRow key={rn.id}>
                {tableFormat['partyNoshowReport'].columns.map((columnName) => {
                  return (
                    <TableCell key={columnName}>
                      {rn[columnName as keyof PartyNoshowReport]?.toString()}
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
