import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  Inotication,
  InoticationTable,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/takgu/admin/recruitments/RecruitmentsUser.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  intraId: 'Intra ID',
  interview: '면접',
  result: '결과',
};

export interface notiMessageType {
  content: string;
}

function NotificationResults({ recruitId }: { recruitId: number }) {
  const [notificationData, setNotificationData] = useState<InoticationTable>({
    noticationList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alignment, setAlignment] = useState<Record<number, string | null>>({});
  const setSnackBar = useSetRecoilState(toastState);
  const [startDate, setStartDate] = useState<Record<number, Date | null>>({});
  const setModal = useSetRecoilState(modalState);

  const onEditTemplate = () => {
    setModal({
      modalName: 'ADMIN-RECRUIT_MESSAGE_TEMPLATE',
    });
  };

  const handleApplicationResultModal = (
    recruitId: number,
    applicationId: number,
    status: 'PROGRESS_INTERVIEW' | 'FAIL',
    interviewDate: Date | null
  ) => {
    setModal({
      modalName: 'ADMIN-RECRUIT_RESULT',
      recruitResult: {
        recruitId,
        applicationId,
        status,
        interviewDate,
      },
    });
  };

  const handleInterviewResultModal = (
    recruitId: number,
    applicationId: number,
    status: 'PASS' | 'FAIL'
  ) => {
    setModal({
      modalName: 'ADMIN-RECRUIT_RESULT',
      recruitResult: {
        recruitId,
        applicationId,
        status,
        interviewDate: null,
      },
    });
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
    id: number
  ) => {
    setAlignment((prev) => ({ ...prev, [id]: newAlignment }));
  };

  const handleDate = (newDate: Date | null, id: number) => {
    setStartDate((prev) => ({ ...prev, [id]: newDate }));
  };

  const getRecruitNotiHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/admin/recruitments?page=${currentPage}&size=20`
      // );
      const res = await instance.get(
        `/admin/recruitments/${recruitId}/applicants`
      );
      // FIXME : 페이지네이션 x 임시로 1페이지로 고정
      setNotificationData({
        noticationList: res.data.applicationResults,
        totalPage: 1,
        currentPage: 1,
      });
      // setNotificationData({
      //   noticationList: res.data.applications,
      //   totalPage: res.data.totalPages,
      //   currentPage: res.data.number + 1,
      // });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get notification',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    getRecruitNotiHandler();
  }, [currentPage]);

  if (!notificationData.noticationList.length) {
    return (
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'recruitUserList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            <AdminEmptyItem content={'공고 지원자 내역이 비어있습니다'} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const renderTableCell = (
    recruitId: number,
    recruit: Inotication,
    columnName: string
  ) => {
    if (columnName === 'interview') {
      return (
        <div className={styles.interview}>
          <DatePicker
            selected={startDate[recruit.applicationId]}
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy-MM-dd HH:mm'
            timeIntervals={60}
            onChange={(newDate) => handleDate(newDate, recruit.applicationId)}
          />
          &nbsp;
          <Button
            variant='outlined'
            onClick={() => {
              handleApplicationResultModal(
                recruitId,
                recruit.applicationId,
                'PROGRESS_INTERVIEW',
                startDate[recruit.applicationId]
              );
            }}
          >
            면접
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              handleApplicationResultModal(
                recruitId,
                recruit.applicationId,
                'FAIL',
                startDate[recruit.applicationId]
              );
            }}
          >
            불합
          </Button>
          {/* 임시 버튼 */}
        </div>
      );
    }

    if (columnName === 'result') {
      return (
        <div>
          <ToggleButtonGroup
            value={alignment[recruit.applicationId]}
            exclusive
            onChange={(event, newAlignment) =>
              handleAlignment(event, newAlignment, recruit.applicationId)
            }
          >
            <ToggleButton size='small' value='합격'>
              합 격
            </ToggleButton>
            <ToggleButton size='small' value='불합격'>
              불합격
            </ToggleButton>
          </ToggleButtonGroup>
          &nbsp;
          <Button
            variant='outlined'
            onClick={() => {
              handleInterviewResultModal(
                recruitId,
                recruit.applicationId,
                alignment[recruit.applicationId] === '합격' ? 'PASS' : 'FAIL'
              );
            }}
          >
            결과
          </Button>
        </div>
      );
    }

    return recruit[columnName as keyof Inotication]?.toString();
  };
  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'notificationList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {notificationData.noticationList.map((recruit: Inotication) => (
              <TableRow className={styles.tableRow} key={recruit.applicationId}>
                {tableFormat['notificationList'].columns.map(
                  (columnName: string, index: number) => (
                    <TableCell className={styles.tableBodyItem} key={index}>
                      {renderTableCell(recruitId, recruit, columnName)}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={notificationData.currentPage}
          totalPages={notificationData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
      <button className={styles.button} onClick={onEditTemplate}>
        메시지 템플릿 작성하기
      </button>
    </>
  );
}

export default NotificationResults;
