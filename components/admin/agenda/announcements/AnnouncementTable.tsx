import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { instance } from 'utils/axios';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

const mockAgendaList = [
  { agendaKey: '1', agendaName: '대회 1' },
  { agendaKey: '2', agendaName: '대회 2' },
];

const mockTeamList = [
  {
    id: 1,
    title: '제목1',
    contents: '내용1',
    isShow: true,
    createdAt: '2024-08-01',
  },
  {
    id: 2,
    title: '제목2',
    contents: '내용2',
    isShow: false,
    createdAt: '2023-08-02',
  },
];

const mockTeamList2 = [
  {
    id: 3,
    title: '제목3',
    contents: '내용3',
    isShow: true,
    createdAt: '2024-08-03',
  },
  {
    id: 4,
    title: '제목4',
    contents: '내용4',
    isShow: false,
    createdAt: '2023-08-04',
  },
];

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  title: '제목',
  content: '내용',
  isShow: '공개 여부',
  createdAt: '생성일',
  etc: '기타',
};

export interface IAnnouncement {
  id: number;
  title: string;
  contents: string;
  isShow: boolean;
  createdAt: string;
}

export interface IAnnouncementTable {
  announcementList: IAnnouncement[];
  totalPage: number;
  currentPage: number;
}

export interface Request {
  page: number;
  size: number;
}

export default function AnnouncementTable() {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [announcementInfo, setAnnouncementInfo] = useState<IAnnouncementTable>({
    announcementList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAgendaKey, setSelectedAgendaKey] = useState('');
  const agendaList = useFetchGet(`list`).data || [];

  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, id: number) => {
    switch (buttonName) {
      case '자세히':
        alert('자세히');
        break;
      case '수정':
        alert('수정');
        break;
      case '삭제':
        alert('삭제');
        break;
    }
  };

  const getAnnoucementList = useCallback(async () => {
    try {
      if (!selectedAgendaKey) {
        return;
      } // 선택된 agenda가 없으면 반환

      // const res = mockTeamList; // 여기에 API 호출 추가
      const response = await instance.get(`/agenda/admin/announcement`, {
        params: {
          agenda_key: selectedAgendaKey,
          page: currentPage,
          size: itemsPerPage,
        },
      });

      // let res = [];
      // if (selectedAgendaKey === '1') {
      //   res = mockTeamList;
      // } else if (selectedAgendaKey === '2') {
      //   res = mockTeamList2;
      // } else {
      //   res = [];
      //   return;
      // }

      // const totalPage = Math.ceil(res.length / itemsPerPage);
      // const paginatedList = res.slice(
      //   (currentPage - 1) * itemsPerPage,
      //   currentPage * itemsPerPage
      // );

      setAnnouncementInfo({
        announcementList: response.data,
        totalPage: 10,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('Error fetching team list:', e);
    }
  }, [currentPage, selectedAgendaKey]); // selectedAgendaKey 추가

  useEffect(() => {
    if (agendaKey) {
      setSelectedAgendaKey(agendaKey as string);
    }
  }, [agendaKey]);

  useEffect(() => {
    if (selectedAgendaKey) {
      getAnnoucementList();
    }
  }, [selectedAgendaKey, currentPage, getAnnoucementList]);

  const handleSelectChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    setSelectedAgendaKey(newValue);
    setCurrentPage(1); // 페이지 초기화
    router.push(`?agendaKey=${newValue}`);
  };

  const renderIsShow = (isShow: boolean) => {
    return isShow ? '공개' : '비공개';
  };

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>공지사항 관리</span>
        <Select
          value={selectedAgendaKey}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value='' disabled>
            Choose an agenda...
          </MenuItem>
          {Array.isArray(agendaList) &&
            agendaList.map((agenda) => (
              <MenuItem key={agenda.agendaKey} value={agenda.agendaKey}>
                {agenda.agendaTitle}
              </MenuItem>
            ))}
        </Select>
      </div>
      {selectedAgendaKey ? (
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='agenda table'>
            <AdminAgendaTableHead
              tableName={'announcement'}
              table={tableTitle}
            />
            <TableBody className={styles.tableBody}>
              {announcementInfo.announcementList.length > 0 ? (
                announcementInfo.announcementList.map(
                  (announce: IAnnouncement, index) => (
                    <TableRow
                      key={`${announce.id}-${index}`}
                      className={styles.tableRow}
                    >
                      {agendaTableFormat['announcement'].columns.map(
                        (columnName: string, index: number) => {
                          return (
                            <TableCell
                              className={styles.tableBodyItem}
                              key={index}
                            >
                              {columnName === 'isShow'
                                ? renderIsShow(announce[columnName])
                                : columnName !== 'etc'
                                ? announce[columnName as keyof IAnnouncement] // 다른 열의 기본 값 표시
                                : agendaTableFormat[
                                    'announcement'
                                  ].etc?.value.map(
                                    (buttonName: string, index: number) => (
                                      <button
                                        key={buttonName}
                                        className={`${styles.button} ${buttonList[index]}`}
                                        onClick={() =>
                                          handleButtonAction(
                                            buttonName,
                                            announce.id
                                          )
                                        }
                                      >
                                        {buttonName}
                                      </button>
                                    )
                                  )}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    팀 목록이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={styles.noAgendaMessage}>
          올바른 아젠다를 선택해주세요.
        </div>
      )}
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={announcementInfo.currentPage}
          totalPages={announcementInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
            getAnnoucementList();
          }}
        />
      </div>
    </div>
  );
}
