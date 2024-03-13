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
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/party/PartyMain.module.scss';

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
      console.log(newCategoryName);
    }
  };

  const deletehandler = (categoryId: number) => {
    deleteCategory(categoryId);
  };

  return (
    <div className={styles.userManagementWrap}>
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
              <TableRow key={c.categoryId} className={styles.tableRow}>
                {tableFormat['partyCategory'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {columnName === 'delete' ? (
                        <button
                          onClick={() => deletehandler(c.categoryId)}
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
