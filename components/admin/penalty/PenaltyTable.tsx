import { Fragment, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { IPenalty, IPenaltyTable } from 'types/admin/adminPenaltyTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/penalty/PenaltyTable.module.scss';

const tableTitle: { [key: string]: string } = {
  penaltyId: 'ID',
  intraId: 'Intra ID',
  reason: '사유',
  releaseTime: '해제 시간',
  etc: '기타',
};

export default function PenaltyTable() {
  const [penaltyInfo, setPenaltyInfo] = useState<IPenaltyTable>({
    penaltyList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [current, setCurrent] = useState<boolean>(true);
  const [modal, setModal] = useRecoilState(modalState);

  const handleButtonAction = (intraId: string, penaltyId: number) =>
    setModal({ modalName: 'ADMIN-PENALTY_DELETE', intraId, penaltyId });

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserPenalty = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/penalty?intraId=${intraId}&page=${currentPage}&size=10&current=${current}`
      );
      setIntraId(intraId);
      setPenaltyInfo({
        penaltyList: res.data.penaltyList.map((penalty: IPenalty) => {
          return {
            ...penalty,
            releaseTime: dateToStringShort(new Date(penalty.releaseTime)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS07');
    }
  }, [intraId, currentPage, current]);

  const getAllUserPenalty = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/penalty?page=${currentPage}&size=10&current=${current}`
      );
      setIntraId('');
      setPenaltyInfo({
        penaltyList: res.data.penaltyList.map((penalty: IPenalty) => {
          return {
            ...penalty,
            releaseTime: dateToStringShort(new Date(penalty.releaseTime)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS08');
    }
  }, [currentPage, current]);

  useEffect(() => {
    intraId ? getUserPenalty() : getAllUserPenalty();
  }, [intraId, getUserPenalty, getAllUserPenalty, modal]);

  return (
    <>
      <div className={styles.penaltyWrap}>
        <div className={styles.header}>
          <span className={styles.title}>
            <div>패널티 관리</div>
            <button
              className={styles.currentBtn}
              onClick={() => setCurrent(!current)}
            >
              {current ? '현재기록' : '전체기록'}
            </button>
          </span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='penalty table'>
            <AdminTableHead tableName={'penalty'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {penaltyInfo.penaltyList.length > 0 ? (
                penaltyInfo.penaltyList.map(
                  (penalty: IPenalty, index: number) => (
                    <TableRow key={index} className={styles.tableRow}>
                      {tableFormat['penalty'].columns.map(
                        (columnName: string) => (
                          <TableCell
                            key={columnName}
                            className={styles.tableBodyItem}
                          >
                            {columnName !== 'etc'
                              ? penalty[
                                  columnName as keyof IPenalty
                                ]?.toString()
                              : tableFormat['penalty'].etc?.value.map(
                                  (buttonName: string) =>
                                    current ? (
                                      <button
                                        key={buttonName}
                                        className={styles.button}
                                        onClick={() =>
                                          handleButtonAction(
                                            penalty.intraId,
                                            penalty.penaltyId
                                          )
                                        }
                                      >
                                        {buttonName}
                                      </button>
                                    ) : (
                                      <Fragment key={index}></Fragment>
                                    )
                                )}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  )
                )
              ) : (
                <AdminEmptyItem content={'패널티 기록이 비어있습니다'} />
              )}
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
