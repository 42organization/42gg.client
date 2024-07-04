import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyCategory } from 'types/partyTypes';
import { tableFormat } from 'constants/takgu/admin/table';
import { AdminTableHead } from 'components/takgu/admin/common/AdminTable';
import usePartyCategory from 'hooks/takgu/party/usePartyCategory';
import styles from 'styles/takgu/admin/party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  categoryId: '카테고리번호',
  categoryName: '카테고리',
  delete: '삭제',
};

export default function PartyCategories() {
  const { categories, createCategory, deleteCategory } = usePartyCategory();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleConfirm = () => {
    if (newCategoryName.trim() !== '') {
      createCategory(newCategoryName);
      setNewCategoryName('');
    }
  };

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>카테고리 관리</span>
        <div>
          <input
            type='text'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            onClick={handleConfirm}
            className={`${styles.button_1} ${styles.add}`}
          >
            추가
          </button>
        </div>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyCategory'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {categories.map((c) => (
              <TableRow key={c.categoryId}>
                {tableFormat['partyCategory'].columns.map((columnName) => {
                  return (
                    <TableCell
                      key={columnName}
                      className={styles.tableBodyItem}
                    >
                      {columnName === 'delete' ? (
                        <button
                          onClick={() => deleteCategory(c.categoryId)}
                          className={`${styles.button_1} ${styles.delete}`}
                        >
                          삭제
                        </button>
                      ) : (
                        c[columnName as keyof PartyCategory]?.toString()
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
