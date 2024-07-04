import { useSetRecoilState } from 'recoil';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { TableName } from 'types/takgu/admin/tableTypes';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/takgu/admin/table';
import styles from 'styles/takgu/admin/common/AdminTable.module.scss';

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
