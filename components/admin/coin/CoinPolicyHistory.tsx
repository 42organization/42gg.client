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
import {
  IcoinPolicyHistory,
  IcoinPolicyHistoryTable,
} from 'types/admin/adminCoinTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/coin/CoinPolicyHistory.module.scss';

const coinPolicyHistoryTableTitle: { [key: string]: string } = {
  coinPolicyId: 'ID',
  createdAt: '등록 시간',
  createUserId: '등록한 사람',
  attendance: '출석 획득',
  normal: '일반게임 획득',
  rankWin: '랭크게임 승리 획득',
  rankLose: '랭크게임 패배 획득',
};

function CoinPolicyHistory() {
  const [coinPolicyHistoryData, setCoinPolicyHistoryData] =
    useState<IcoinPolicyHistoryTable>({
      coinPolicyList: [],
      totalPage: 0,
      currentPage: 0,
    });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  const getCoinPolicyHistoryHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/coinpolicy?page=${currentPage}&size=5`
      );
      setCoinPolicyHistoryData({
        coinPolicyList: res.data.coinPolicyList.map(
          (coinPolicyHistory: IcoinPolicyHistory) => {
            return {
              ...coinPolicyHistory,
              createdAt: dateToStringShort(
                new Date(coinPolicyHistory.createdAt)
              ),
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
          <AdminTableHead
            tableName={'coinPolicyHistory'}
            table={coinPolicyHistoryTableTitle}
          />
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
              <AdminEmptyItem content={'정책 변경 이력이 없습니다.'} />
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
