import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IitemHistory, IitemHistoryList } from 'types/admin/adminStoreTypes';
import { tableFormat } from 'constants/admin/table';
import { getFormattedDateToString } from 'utils/handleTime';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import PageNation from 'components/Pagination';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/store/ItemHistory.module.scss';

const itemHistoryTableTitle: { [key: string]: string } = {
  itemId: 'ID',
  createdAt: '변경일',
  intraId: '변경한 사람',
  itemName: '이름',
  content: '설명',
  imageUrl: '이미지',
  price: '원가',
  discount: '할인율',
  salePrice: '판매가격',
};

const tableColumnName = [
  'itemId',
  'createdAt',
  'intraId',
  'itemName',
  'content',
  'imageUrl',
  'price',
  'discount',
  'salePrice',
];

function ItemHistory() {
  const [itemHistoryData, setItemHistoryData] = useState<IitemHistoryList>({
    itemHistoryList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  const getItemHistoryListHandler = useMockAxiosGet<any>({
    url: `admin/items/history?page=${currentPage}&size=5`,
    setState: (data) => {
      setItemHistoryData({
        itemHistoryList: data.itemHistoryList.map(
          (itemHistory: IitemHistory) => {
            const { year, month, date, hour, min } = getFormattedDateToString(
              new Date(itemHistory.createdAt)
            );
            return {
              ...itemHistory,
              createdAt: `${year}-${month}-${date} ${hour}:${min}`,
            };
          }
        ),
        totalPage: data.totalPage,
        currentPage: currentPage,
      });
    },
    err: 'HJ07',
    type: 'setError',
  });

  useEffect(() => {
    getItemHistoryListHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {itemHistoryTableTitle[column]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {itemHistoryData.itemHistoryList.length > 0 ? (
              itemHistoryData.itemHistoryList.map(
                (itemHistory: IitemHistory) => (
                  <TableRow
                    className={styles.tableRow}
                    key={itemHistory.itemId}
                  >
                    {tableFormat['itemHistory'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {columnName === 'imageUrl' ? (
                              <Image
                                src={itemHistory[columnName]}
                                width={30}
                                height={30}
                                alt='no'
                              />
                            ) : (
                              itemHistory[
                                columnName as keyof IitemHistory
                              ].toString()
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                )
              )
            ) : (
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableBodyItem}>
                  비어있습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={itemHistoryData.currentPage}
          totalPages={itemHistoryData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default ItemHistory;
