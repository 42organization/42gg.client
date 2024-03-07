import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyCategory } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/party/PartyMain.module.scss';

const tableTitle: { [key: string]: string } = {
  categoryId: '카테고리번호',
  categoryName: '카테고리',
  delete: '삭제',
};

export default function PartyCategories() {
  const { categorys } = usePartyRoom();
  const [newCategoryName, setNewCategoryName] = useState('');

  const categories: PartyCategory[] = categorys.map((cate) => ({
    categoryId: cate.categoryId,
    categoryName:
      categorys.find((c) => c.categoryId === cate.categoryId)?.categoryName ??
      '???',
  }));

  useEffect(() => {
    console.log('render');
  }, [categorys]);

  const handleConfirm = () => {
    if (newCategoryName.trim() !== '') {
      const newCategory = {
        categoryName: newCategoryName,
      };
      mockInstance
        .post('/party/admin/categorys', newCategory)
        .then(() => {
          setNewCategoryName('');
        })
        .catch((error) => {
          console.error('카테고리 추가 중 오류가 발생했습니다:', error);
        });
    }
  };

  const deleteCategory = (categoryId: number) => {
    mockInstance
      .delete(`/party/admin/categorys/${categoryId}`)
      .catch((error) => {
        console.error('카테고리 삭제 중 오류가 발생했습니다:', error);
      });
  };
  console.log(
    tableFormat['partyCategory'].columns.map(
      (columnName) => tableTitle[columnName]
    )
  );
  console.log(categories);
  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>카테고리 관리</span>
        <input
          type='text'
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleConfirm}>확인</button>
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
                        <button onClick={() => deleteCategory(c.categoryId)}>
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
