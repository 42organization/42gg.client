import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import PageNation from 'components/Pagination';
import { tableFormat } from 'constants/admin/table';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import style from 'styles/admin/notification/NotificationTable.module.scss';
import { modalState } from 'utils/recoil/modal';
import AdminSearchBar from '../common/AdminSearchBar';

interface IFeedback {
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

export default function FeedbackTable() {
  const [feedbackInfo, setFeedbackInfo] = useState<IFeedbackTable>({
    feedbackList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const setModal = useSetRecoilState(modalState);

  const getUserFeedbacks = useCallback(async () => {
    try {
      // TODO! : change to real endpoint
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/feedback/users/${intraId}?page=${currentPage}`
      );
      setIntraId(intraId);
      setFeedbackInfo({ ...res.data });
    } catch (e) {
      console.error('MS04');
    }
  }, [intraId, currentPage]);

  const getAllFeedbacks = useCallback(async () => {
    try {
      // TODO! : change to real endpoint
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/feedback?page=${currentPage}`
      );
      setFeedbackInfo({ ...res.data });
    } catch (e) {
      console.error('MS03');
    }
  }, [currentPage]);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const solvingFeedback = (
    e: React.ChangeEvent<HTMLSelectElement>,
    feedback: IFeedback
  ) => {
    setModal({
      modalName: 'ADMIN-CHECK_FEEDBACK',
      intraId: feedback.intraId,
    });
  };

  useEffect(() => {
    intraId ? getUserFeedbacks() : getAllFeedbacks();
  }, [intraId, getUserFeedbacks, getAllFeedbacks]);

  return (
    <>
      <div>
        <span className={style.title}>알림 관리</span>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <TableContainer className={style.tableContainer} component={Paper}>
        <Table className={style.table} aria-label='customized table'>
          <TableHead className={style.tableHeader}>
            <TableRow>
              {tableFormat['feedback'].columns.map((columnName) => (
                <TableCell className={style.tableHeaderItem} key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={style.tableBody}>
            {feedbackInfo.feedbackList.map((feedback: IFeedback) => (
              <TableRow key={feedback.id}>
                {Object.values(feedback).map(
                  (value: number | string | boolean, index: number) => {
                    return (
                      <TableCell className={style.tableBodyItem} key={index}>
                        {typeof value === 'boolean' ? (
                          <select
                            onChange={(e) => solvingFeedback(e, feedback)}
                          >
                            <option value='1'>처리중</option>
                            <option value='2'>처리완료</option>
                          </select>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={style.pageNationContainer}>
        <PageNation
          curPage={feedbackInfo.currentPage}
          totalPages={feedbackInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}
