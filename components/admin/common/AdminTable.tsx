import { TableCell, TableHead, TableRow } from '@mui/material';
import { TableName } from 'types/admin/tableTypes';
import { tableFormat } from 'constants/admin/table';
import styles from 'styles/admin/common/AdminTable.module.scss';

interface IAdminTableHead {
  tableName: TableName;
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

export function AdminEmptyItem(content: string) {
  return (
    <TableRow>
      <TableCell>{content}</TableCell>
    </TableRow>
  );
}
