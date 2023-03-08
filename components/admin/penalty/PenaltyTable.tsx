import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import PageNation from 'components/Pagination';
import { tableFormat } from 'constants/admin/table';
import { useCallback, useEffect, useState } from 'react';
import instance from 'utils/axios';
import AdminSearchBar from '../common/AdminSearchBar';
import styles from 'styles/admin/penalty/PenaltyTable.module.scss';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

// intra id, 사유, 해방 시간, 삭제 버튼

interface IPenalty {
  intraId: string;
  reason: string;
  releaseTime: Date;
}

interface IPenaltyTable {
  penaltyList: IPenalty[];
  totalPage: number;
  currentPage: number;
}

export default function PenaltyTable() {
  const [penaltyInfo, setPenaltyInfo] = useState<IPenaltyTable>({
    penaltyList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const setModal = useSetRecoilState(modalState);

  const handleButtonAction = (intraId: string) =>
    setModal({ modalName: 'ADMIN-PENALTY_DETETE', intraId });

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserPenalty = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/penalty/users?q=${intraId}&page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setPenaltyInfo({ ...res.data });
    } catch (e) {
      console.error('MS07');
    }
  }, [intraId, currentPage]);

  const getAllUserPenalty = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/penalty/users?page=${currentPage}&size=10`
      );
      setIntraId('');
      setPenaltyInfo({ ...res.data });
    } catch (e) {
      console.error('MS08');
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserPenalty() : getAllUserPenalty();
  }, [intraId, getUserPenalty, getAllUserPenalty]);

  if (!penaltyInfo.penaltyList.length) return <div>비어있습니다!</div>;

  return (
    <>
      <div className={styles.penaltyWrap}>
        <div className={styles.header}>
          <span className={styles.title}>패널티 관리</span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='penalty table'>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                {tableFormat['penalty'].columns.map((columnName: string) => (
                  <TableCell
                    key={columnName}
                    className={styles.tableHeaderItem}
                  >
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {penaltyInfo.penaltyList.map((penalty: IPenalty) => (
                <TableRow key={penalty.intraId} className={styles.tableRow}>
                  {tableFormat['penalty'].columns.map((columnName: string) => (
                    <TableCell
                      key={columnName}
                      className={styles.tableBodyItem}
                    >
                      {columnName !== 'etc'
                        ? penalty[columnName as keyof IPenalty]?.toString()
                        : tableFormat['penalty'].etc?.value.map(
                            (buttonName: string) => (
                              <button
                                key={buttonName}
                                onClick={() =>
                                  handleButtonAction(penalty.intraId)
                                }
                              >
                                {buttonName}
                              </button>
                            )
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pageNationContainer}>
          <PageNation
            curPage={penaltyInfo.currentPage}
            totalPages={penaltyInfo.totalPage}
            pageChangeHandler={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
