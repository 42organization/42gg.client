import { tableFormat } from 'constants/admin/table';
import { TableName } from 'types/admin/tableTypes';
import styles from 'styles/admin/common/TableTemplate.module.scss';

export interface ITableTitleSet {
  [key: string]: {
    [key: string]: string;
  };
}

export const TableTitleSet: ITableTitleSet = {
  userInfo: {
    id: 'Id',
    roleType: '권한',
    intraId: 'Intra ID',
    statusMessage: '상태 메시지',
    etc: '기타',
  },
  feedback: {
    id: 'Id',
    intraId: 'Intra ID',
    category: '카테고리',
    content: '내용',
    createdTime: '접수 시간',
    isSolved: '해결 여부',
  },
};

export default function TableHeader({ format }: { format: TableName }) {
  return (
    <thead className={styles.tableHeader}>
      <tr>
        {tableFormat[format].columns.map((data: string, index: number) => {
          return (
            <th key={index} className={styles.tableHeaderItem}>
              {TableTitleSet[format][data]}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
