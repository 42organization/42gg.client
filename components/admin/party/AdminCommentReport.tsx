import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyCommentReport, PartyCommentReportTable } from 'types/partyTypes';
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
  commentsId: '댓글 번호',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminCommentReport() {
  const [commentInfo, setCommentInfo] = useState<PartyCommentReportTable>({
    commentReportList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchComment = useCallback(async () => {
    try {
      const res = await instanceInPartyManage.get(
        `/reports/comments?page=${currentPage}&size=10`
      );
      setCommentInfo({
        commentReportList: res.data.commentReportList,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>댓글 신고리스트</span>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyCommentReport'} table={tableTitle} />
          <TableBody>
            {commentInfo.commentReportList &&
            commentInfo.commentReportList.length > 0 ? (
              commentInfo.commentReportList.map(
                (report: PartyCommentReport, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['partyCommentReport'].columns.map(
                      (columnName) => {
                        return (
                          <TableCell key={columnName}>
                            {report[
                              columnName as keyof PartyCommentReport
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
          curPage={commentInfo.currentPage}
          totalPages={commentInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
