import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Ireceipt, IreceiptTable } from 'types/admin/adminReceiptType';
import { dateToStringShort } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/receipt/ReceiptList.module.scss';

const tableTitle: { [key: string]: string } = {
  receiptId: 'ID',
  createdAt: '구매 시간',
  itemName: '아이템 이름',
  itemPrice: '구매 가격',
  purchaserIntra: '구매자',
  ownerIntra: '수령자',
  itemStatus: '상태',
};

function ReceiptList() {
  const [receiptData, setReceiptData] = useState<IreceiptTable>({
    receiptList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const setSnackBar = useSetRecoilState(toastState);

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가
  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserReceiptHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/receipt/?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setReceiptData({
        receiptList: res.data.receiptList.map((receipt: Ireceipt) => {
          return {
            ...receipt,
            createdAt: dateToStringShort(new Date(receipt.createdAt)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get user receipt',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [intraId, currentPage]);

  // instanceInManage로 변경
  const getAllReceiptHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/receipt/?page=${currentPage}&size=10`
      );
      setReceiptData({
        receiptList: res.data.receiptList.map((receipt: Ireceipt) => {
          return {
            ...receipt,
            createdAt: dateToStringShort(new Date(receipt.createdAt)),
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
    intraId ? getUserReceiptHandler() : getAllReceiptHandler();
  }, [intraId, getUserReceiptHandler, getAllReceiptHandler]);

  return (
    <>
      <div className={styles.searchWrap}>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'receiptList'} table={tableTitle} />
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
              <AdminEmptyItem content={'아이템 거래내역이 비어있습니다'} />
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
