import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IFeedback, IFeedbackTable } from 'types/admin/adminFeedbackTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminContent,
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/feedback/FeedbackTable.module.scss';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  intraId: 'Intra ID',
  category: '종류',
  content: '내용',
  createdAt: '생성 시간',
  isSolved: '해결 여부',
};

const MAX_CONTENT_LENGTH = 20;

export default function FeedbackTable() {
  const [feedbackInfo, setFeedbackInfo] = useState<IFeedbackTable>({
    feedbackList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [modal, setModal] = useRecoilState(modalState);

  const getUserFeedbacks = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/feedback?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setFeedbackInfo({
        feedbackList: res.data.feedbackList.map((feedback: IFeedback) => {
          return {
            ...feedback,
            createdAt: dateToStringShort(new Date(feedback.createdAt)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS04');
    }
  }, [intraId, currentPage]);

  const getAllFeedbacks = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/feedback?page=${currentPage}&size=10`
      );
      setFeedbackInfo({
        feedbackList: res.data.feedbackList.map((feedback: IFeedback) => {
          return {
            ...feedback,
            createdAt: dateToStringShort(new Date(feedback.createdAt)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS03');
    }
  }, [currentPage]);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const solvingFeedback = (feedback: IFeedback) => {
    setModal({
      modalName: 'ADMIN-CHECK_FEEDBACK',
      feedback,
    });
  };

  useEffect(() => {
    intraId ? getUserFeedbacks() : getAllFeedbacks();
  }, [intraId, getUserFeedbacks, getAllFeedbacks, modal]);

  return (
    <>
      <div className={styles.feedbackWrap}>
        <div className={styles.header}>
          <span className={styles.title}>피드백 관리</span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='customized table'>
            <AdminTableHead tableName={'feedback'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {feedbackInfo.feedbackList.length > 0 ? (
                feedbackInfo.feedbackList.map((feedback: IFeedback) => (
                  <TableRow key={feedback.id} className={styles.tableRow}>
                    {tableFormat['feedback'].columns.map(
                      (columnName: string) => {
                        const value = feedback[columnName as keyof IFeedback];
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={columnName}
                          >
                            {typeof value === 'boolean' ? (
                              <select
                                value={feedback.isSolved ? 1 : 0}
                                onChange={() => solvingFeedback(feedback)}
                              >
                                <option value='0'>처리중</option>
                                <option value='1'>처리완료</option>
                              </select>
                            ) : (
                              <AdminContent
                                content={value?.toString() || ''}
                                maxLen={MAX_CONTENT_LENGTH}
                                detailTitle={feedback.intraId}
                                detailContent={feedback.content}
                              />
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                ))
              ) : (
                <AdminEmptyItem content={'접수된 피드백이 없습니다'} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pageNationContainer}>
          <PageNation
            curPage={feedbackInfo.currentPage}
            totalPages={feedbackInfo.totalPage}
            pageChangeHandler={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
