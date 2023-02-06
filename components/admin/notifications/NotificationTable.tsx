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
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admin/notifications?page=${currentPage}`)
      .then((data) => {
        setNotificationInfo({ ...data.data });
      });
  }, [currentPage]);

  if (notificationInfo === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: 700,
            margin: 'auto',
            display: 'flex',
          }}
        >
          <SearchBar />
          <CreateNotiButton />
        </div>
        <TableContainer sx={{ width: 700, margin: 'auto' }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead sx={{ backgroundColor: 'lightgray' }}>
              <TableRow>
                <TableCell align='center'>Noti Id</TableCell>
                <TableCell align='center'>Intra Id</TableCell>
                <TableCell align='center'>Slot Id</TableCell>
                <TableCell align='center'>Type</TableCell>
                <TableCell align='center'>생성일</TableCell>
                <TableCell align='center'>유저 확인 여부</TableCell>
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
                        <TableCell align='center' key={index}>
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
      </div>
      <PageNation
        curPage={notificationInfo.currentPage}
        totalPages={notificationInfo.totalPage}
        pageChangeHandler={(pageNumber: number) => {
          setCurrentPage(pageNumber);
        }}
      />
    </>
  );
}
