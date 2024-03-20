import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyNoshowReport, PartyNoshowReportTable } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/Party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterIntraId: '신고자 이름',
  reporteeIntraId: '피신고자 이름',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminPartyNoShow() {
  const [noShowInfo, setNoShowInfo] = useState<PartyNoshowReportTable>({
    userReportPageList: [],
    totalPages: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetchNoShow = useCallback(async () => {
    try {
      const res = await instanceInPartyManage.get(
        `/party/admin/reports/users?page=${currentPage}&size=10`
      );
      setNoShowInfo({
        userReportPageList: res.data.userReportPageList,
        totalPages: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchNoShow();
  }, [fetchNoShow]);

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>노쇼 신고리스트</span>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyNoshowReport'} table={tableTitle} />
          <TableBody>
            {noShowInfo.userReportPageList.length > 0 ? (
              noShowInfo.userReportPageList.map(
                (report: PartyNoshowReport, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['partyNoshowReport'].columns.map(
                      (columnName) => {
                        return (
                          <TableCell key={columnName}>
                            {report[
                              columnName as keyof PartyNoshowReport
                            ]?.toString()}
                          </TableCell>
                        );
                      }
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
          curPage={noShowInfo.currentPage}
          totalPages={noShowInfo.totalPages}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
