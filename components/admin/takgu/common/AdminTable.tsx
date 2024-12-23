import { useSetRecoilState } from 'recoil';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { agendaTableName } from 'types/admin/agenda/agendaTableTypes';
import { TableName } from 'types/admin/takgu/tableTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { tableFormat } from 'constants/admin/table';
import styles from 'styles/admin/takgu/common/AdminTable.module.scss';

interface IAdminTableHead {
  tableName: TableName;
  table: { [key: string]: string };
}

interface IAdminAgendaTableHead {
  tableName: agendaTableName;
  table: { [key: string]: string };
}

export function AdminTableHead({ tableName, table }: IAdminTableHead) {
  return (
    <TableHead className={styles.tableHeader}>
      <TableRow>
        {tableFormat[tableName].columns.map((columnName) => (
          <TableCell className={styles.tableHeaderItem} key={columnName}>
            {table[columnName]}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function AdminAgendaTableHead({
  tableName,
  table,
}: IAdminAgendaTableHead) {
  return (
    <TableHead className={styles.tableHeader}>
      <TableRow>
        {agendaTableFormat[tableName].columns.map((columnName) => (
          <TableCell className={styles.tableHeaderItem} key={columnName}>
            {table[columnName]}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface IAdminEmpty {
  content: string;
}

export function AdminEmptyItem({ content }: IAdminEmpty) {
  return (
    <TableRow className={styles.tableRow}>
      <TableCell className={styles.tableBodyItem}>{content}</TableCell>
    </TableRow>
  );
}

interface IAdminDetailContent {
  content: string;
  maxLen: number;
  detailTitle?: string;
  detailContent?: string;
}

export function AdminContent({
  content,
  maxLen,
  detailTitle = '',
  detailContent = '',
}: IAdminDetailContent) {
  const setModal = useSetRecoilState(modalState);

  return content?.length > maxLen && detailTitle && detailContent ? (
    <div>
      {(content?.toString() || '').slice(0, maxLen)}
      <span
        style={{ cursor: 'pointer', color: 'grey' }}
        onClick={() =>
          setModal({
            modalName: 'ADMIN-DETAIL_CONTENT',
            detailTitle: detailTitle,
            detailContent: detailContent,
          })
        }
      >
        ...더보기
      </span>
    </div>
  ) : (
    <div>{content?.toString()}</div>
  );
}

export function DetailContentHover({
  content,
  maxLen,
}: {
  content?: string;
  maxLen: number;
}) {
  if (!content) return <div>N/A</div>;

  return content?.length > maxLen ? (
    <div className={styles.tableBodyItemHover}>
      <div className={styles.info}>
        {(content?.toString() || '').slice(0, maxLen)}...
      </div>
      {/* <div className={`${styles.hoverInfo}`}>{content}</div> */}
    </div>
  ) : (
    <div>{content?.toString()}</div>
  );
}
