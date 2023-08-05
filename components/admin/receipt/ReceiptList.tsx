import { useEffect, useState } from 'react';
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

  // 특정 유저 거래 내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가

  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  const getReceiptHandler = useMockAxiosGet<any>({
    url: `/admin/receipt/?page=${currentPage}&size=10`,
    setState: (data) => {
      setReceiptData({
        receiptList: data.receiptList.map((receipt: Ireceipt) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(receipt.createdAt)
          );
          return {
            ...receipt,
            createdAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: data.totalPage,
        currentPage: currentPage,
      });
    },
    err: 'HJ02',
    type: 'setError',
  });

  useEffect(() => {
    getReceiptHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell key={idx}>{receiptListTableTitle[column]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptData.receiptList.length > 0 ? (
              receiptData.receiptList.map((receipt: Ireceipt) => (
                <TableRow key={receipt.receiptId}>
                  {tableFormat['receiptList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell key={index}>
                          {receipt[columnName as keyof Ireceipt].toString()}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>비어있습니다</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
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
