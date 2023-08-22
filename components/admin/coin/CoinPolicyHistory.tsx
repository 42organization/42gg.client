import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  IcoinPolicyHistory,
  IcoinPolicyHistoryTable,
} from 'types/admin/adminCoinTypes';
import { getFormattedDateToString } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/coin/CoinPolicyHistory.module.scss';

const coinPolicyHistoryTableTitle: { [key: string]: string } = {
  coinPolicyId: 'ID',
  createdAt: '등록 날짜',
  createUser: '등록 유저',
  attendance: '출석 획득',
  normal: '일반게임 획득',
  rankWin: '랭크게임 승리 획득',
  rankLose: '랭크게임 패배 획득',
};

const tableColumnName = [
  'coinPolicyId',
  'createdAt',
  'createUser',
  'attendance',
  'normal',
  'rankWin',
  'rankLose',
];

function CoinPolicyHistory() {
  const [coinPolicyHistoryData, setCoinPolicyHistoryData] =
    useState<IcoinPolicyHistoryTable>({
      coinPolicyList: [],
      totalPage: 0,
      currentPage: 0,
    });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  // instanceInManage로 변경
  const getCoinPolicyHistoryHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/coinpolicy?page=${currentPage}&size=5`
      );
      setCoinPolicyHistoryData({
        coinPolicyList: res.data.coinPolicyList.map(
          (coinPolicyHistory: IcoinPolicyHistory) => {
            const { year, month, date, hour, min } = getFormattedDateToString(
              new Date(coinPolicyHistory.createdAt)
            );
            return {
              ...coinPolicyHistory,
              createdAt: `${year}-${month}-${date} ${hour}:${min}`,
            };
          }
        ),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get coinpolicyhistory',
        severity: 'error',
        message: 'API 요청에 문제가 발생했습니다.',
        clicked: true,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    getCoinPolicyHistoryHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {coinPolicyHistoryTableTitle[column]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {coinPolicyHistoryData.coinPolicyList.length > 0 ? (
              coinPolicyHistoryData.coinPolicyList.map(
                (coinPolicyHistory: IcoinPolicyHistory) => (
                  <TableRow
                    className={styles.tableRow}
                    key={coinPolicyHistory.coinPolicyId}
                  >
                    {tableFormat['coinPolicyHistory'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {coinPolicyHistory[
                              columnName as keyof IcoinPolicyHistory
                            ].toString()}
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
          curPage={coinPolicyHistoryData.currentPage}
          totalPages={coinPolicyHistoryData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default CoinPolicyHistory;
