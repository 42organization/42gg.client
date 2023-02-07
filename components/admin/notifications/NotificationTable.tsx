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
import SearchBar from 'components/main/SearchBar';
import PageNation from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import CreateNotiButton from './CreateNotiButton';

interface INotification {
  notiId: number;
  intraId: string;
  slotId: number;
  type: string;
  createdTime: Date;
  isChecked: boolean;
}

interface INotificaionTable {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

// TODO 각 페이지별 column name을 contants object로 분류, 각 페이지에서 indexing해서 사용

export default function NotificationTable() {
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');

  const getUserNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/notifications/${intraId}?page=${currentPage}`
      );
      setIntraId(intraId);
      setNotificationInfo({ ...res.data });
    } catch (e) {
      console.error('MS00');
    }
  }, [intraId, currentPage]);

  const initSearch = useCallback((intraId: string) => {
    setIntraId(intraId);
    setCurrentPage(1);
  }, []);

  const getAllUserNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/notifications?page=${currentPage}`
      );
      setNotificationInfo({ ...res.data });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserNotifications() : getAllUserNotifications();
  }, [intraId, getUserNotifications, getAllUserNotifications]);

  if (notificationInfo === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            width: 700,
            margin: 'auto',
            display: 'flex',
          }}
        >
          <SearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div>
        <TableContainer sx={{ width: 700, margin: 'auto' }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead sx={{ backgroundColor: 'lightgray' }}>
              <TableRow>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  Noti Id
                </TableCell>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  Intra Id
                </TableCell>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  Slot Id
                </TableCell>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  Type
                </TableCell>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  생성일
                </TableCell>
                <TableCell sx={{ padding: '5px' }} align='center'>
                  유저 확인 여부
                </TableCell>
                {/* 버튼이 필요할 경우 아래처럼 column name을 기타(또는 다른 이름)로 설정 */}
                {/* <TableCell align='center'>기타</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {notificationInfo.notiList.map((notification: INotification) => (
                <TableRow key={notification.notiId}>
                  {Object.values(notification).map(
                    (value: number | string | boolean, index: number) => {
                      return (
                        <TableCell
                          align='center'
                          sx={{ padding: '10px' }}
                          key={index}
                        >
                          {typeof value === 'boolean'
                            ? value
                              ? 'Checked'
                              : 'Unchecked'
                            : value}
                        </TableCell>
                      );
                    }
                  )}
                  {/* 버튼이 필요할 경우 아래처럼 단독으로 생성 */}
                  {/* <TableCell align='center'>
                  <button
                    onClick={() =>
                      console.log(
                        `자세히 id : ${notification.notiId}`,
                        `유저 id : ${notification.intraId}`
                      )
                    }
                  >
                    자세히
                  </button>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PageNation
          curPage={notificationInfo.currentPage}
          totalPages={notificationInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}
