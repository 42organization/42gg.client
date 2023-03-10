import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import PageNation from 'components/Pagination';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import { tableFormat } from 'constants/admin/table';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/feedback/FeedbackTable.module.scss';
import { getFormattedDateToString } from 'utils/handleTime';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  intraId: 'intra ID',
  category: '종류',
  content: '내용',
  createdTime: '생성일',
  isSolved: '해결 여부',
};

export interface IFeedback {
  id: number;
  intraId: string;
  category: number; // 1: bug, 2: suggestion, 3: question
  content: string;
  createdTime: Date;
  isSolved: boolean;
}

interface IFeedbackTable {
  feedbackList: IFeedback[];
  totalPage: number;
  currentPage: number;
}

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
      // TODO : api 수정 필요
      const res = await instance.get(
        `/pingpong/admin/feedback/users/${intraId}?page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setFeedbackInfo({
        feedbackList: res.data.feedbackList.map((feedback: IFeedback) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(feedback.createdTime)
          );
          return {
            ...feedback,
            createdTime: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
      setFeedbackInfo({ ...res.data });
    } catch (e) {
      console.error('MS04');
    }
  }, [intraId, currentPage]);

  const getAllFeedbacks = useCallback(async () => {
    try {
      const res = await instance.get(
        `/pingpong/admin/feedback?page=${currentPage}&size=10`
      );
      setFeedbackInfo({
        feedbackList: res.data.feedbackList.map((feedback: IFeedback) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(feedback.createdTime)
          );
          return {
            ...feedback,
            createdTime: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
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

  const openDetailModal = (feedback: IFeedback) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      intraId: feedback.intraId,
      detailContent: feedback.content,
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
            <TableHead className={styles.tableHeader}>
              <TableRow>
                {tableFormat['feedback'].columns.map((columnName) => (
                  <TableCell
                    className={styles.tableHeaderItem}
                    key={columnName}
                  >
                    {tableTitle[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
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
                            ) : value.toString().length > MAX_CONTENT_LENGTH ? (
                              <div>
                                {value.toString().slice(0, MAX_CONTENT_LENGTH)}
                                <span
                                  style={{ cursor: 'pointer', color: 'grey' }}
                                  onClick={() => openDetailModal(feedback)}
                                >
                                  ...더보기
                                </span>
                              </div>
                            ) : (
                              value.toString()
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>접수된 피드백이 없습니다</TableCell>
                </TableRow>
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
