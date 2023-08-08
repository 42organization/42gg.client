import { useCallback, useEffect, useState } from 'react';
import { Ireceipt, IreceiptTable } from 'types/admin/adminReceiptType';
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
import styles from 'styles/admin/receipt/ReceiptList.module.scss';
import { useSetRecoilState } from 'recoil';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';

const receiptListTableTitle: { [key: string]: string } = {
  receiptId: 'ID',
  createdAt: '구매일자',
  itemName: '아이템명',
  itemPrice: '구매가격',
  purchaserIntra: '구매자',
  ownerIntra: '수령자',
  itemStatus: '아이템 상태',
};

const tableColumnName = [
  'receiptId',
  'createdAt',
  'itemName',
  'itemPrice',
  'purchaserIntra',
  'ownerIntra',
  'itemStatus',
];

function ReceiptList() {
  const [receiptData, setReceiptData] = useState<IreceiptTable>({
    receiptList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  // todo: 특정 유저 거래 내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가

  // todo: api 연결 시 instanceInManage로 변경
  const getReceiptHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/receipt/?page=${currentPage}&size=10`
      );
      setReceiptData({
        receiptList: res.data.receiptList.map((receipt: Ireceipt) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(receipt.createdAt)
          );
          return {
            ...receipt,
            createdAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get receipt',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    getReceiptHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {receiptListTableTitle[column]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {receiptData.receiptList.length > 0 ? (
              receiptData.receiptList.map((receipt: Ireceipt) => (
                <TableRow className={styles.tableRow} key={receipt.receiptId}>
                  {tableFormat['receiptList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {receipt[columnName as keyof Ireceipt].toString()}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
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
          curPage={receiptData.currentPage}
          totalPages={receiptData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default ReceiptList;
