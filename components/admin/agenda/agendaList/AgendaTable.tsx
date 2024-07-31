import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { instance } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AgendaStatus } from 'constants/agenda/agenda';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';
const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

export const mockAgendaList = [
  {
    agendaTitle: '아젠다 제목 1',
    agendaDeadLine: '2024-08-01',
    agendaStartTime: '2024-08-10',
    agendaEndTime: '2024-08-20',
    agendaCurrentTeam: 5,
    agendaMaxTeam: 10,
    agendaMinPeople: 1,
    agendaMaxPeople: 10,
    agendaLocation: '장소 1',
    agendaKey: '1',
    isRanking: true,
    isOfficial: false,
    agendaStatus: 'ON_GOING',
  },
  {
    agendaTitle: '아젠다 제목 1.1',
    agendaDeadLine: '2024-08-01',
    agendaStartTime: '2024-08-10',
    agendaEndTime: '2024-08-20',
    agendaCurrentTeam: 5,
    agendaMaxTeam: 10,
    agendaMinPeople: 1,
    agendaMaxPeople: 10,
    agendaLocation: '장소 1',
    agendaKey: '1',
    isRanking: true,
    isOfficial: true,
    agendaStatus: 'ON_GOING',
  },
  {
    agendaTitle: '아젠다 제목 2',
    agendaDeadLine: '2024-08-15',
    agendaStartTime: '2024-08-20',
    agendaEndTime: '2024-08-30',
    agendaCurrentTeam: 3,
    agendaMaxTeam: 8,
    agendaMinPeople: 1,
    agendaMaxPeople: 10,
    agendaLocation: '장소 2',
    agendaKey: '2',
    isRanking: false,
    isOfficial: true,
    agendaStatus: 'CONFIRM',
  },
];

const tableTitle: { [key: string]: string } = {
  agendaTitle: '제목',
  agendaDeadLine: '모집 마감일',
  agendaStartTime: '시작 시간',
  agendaEndTime: '종료 시간',
  // agendaCurrentTeam: '참가 팀',
  // agendaMaxTeam: '최대 팀',
  // agendaMinPeople: '최소 인원',
  // agendaMaxPeople: '최대 인원',
  agendaLocation: '장소',
  // agendaKey: '아젠다 ID',
  // isRanking: '랭킹 여부',
  isOfficial: '공식 여부',
  agendaStatus: '상태',

  // ---------------------
  etc: '기타',
};

export interface IAgenda {
  agendaTitle: string;
  agendaDeadLine: string;
  agendaStartTime: string;
  agendaEndTime: string;
  agendaCurrentTeam: number;
  agendaMaxTeam: number;
  agendaMinPeople: number;
  agendaMaxPeople: number;
  agendaLocation: string;
  agendaKey: string;
  isRanking: boolean;
  isOfficial: boolean;
  agendaStatus: string;
}

export interface IAgendaTable {
  agendaList: IAgenda[];
  totalPage: number;
  currentPage: number;
}

export interface Request {
  page: number;
  size: number;
}

interface AgendaTableProps {
  status?: AgendaStatus;
  isOfficial?: boolean;
}

export default function AgendaTable({ status, isOfficial }: AgendaTableProps) {
  const router = useRouter();
  const [agendaInfo, setAgendaInfo] = useState<IAgendaTable>({
    agendaList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, agendaKey: string) => {
    switch (buttonName) {
      case '자세히':
        // setModal({ modalName: 'ADMIN-PROFILE', intraId });
        alert('자세히');
        break;
      case '대회 수정':
        // setModal({ modalName: 'ADMIN-PROFILE', intraId });
        alert('대회 수정');
        break;
      case '대회 삭제':
        // 모달 추가
        alert('대회 삭제');
        break;
      case '팀 목록':
        router.push(`/admin/agenda/teamList?agenda_key=${agendaKey}`);
        break;
      case '공지사항':
        router.push(`/admin/agenda/announcements?agenda_key=${agendaKey}`);
        break;
    }
  };

  const getAgendaList = useCallback(async () => {
    try {
      // const params = {
      //   page: currentPage,
      //   size: 10,
      // };
      // const res = await instance.get(`/agenda/admin/request/list`, {
      //   params,
      // });
      // const res = await instance.get(
      //   `/agenda/admin/request/list?page=${currentPage}&size=10`
      // );
      const res = mockAgendaList;

      const filteredAgendaList = res.filter((agenda: IAgenda) => {
        const matchesStatus = status ? agenda.agendaStatus === status : true;
        const matchesOfficial =
          isOfficial !== undefined ? agenda.isOfficial === isOfficial : true;
        return matchesStatus && matchesOfficial;
      });

      const totalPage = Math.ceil(filteredAgendaList.length / itemsPerPage);
      const paginatedList = filteredAgendaList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      // const agendaList = res.map((agenda: AgendaData) => {
      //   return {
      //     ...agenda,
      //     agendaDeadLine: dateToStringShort(agenda.agendaDeadLine),
      //     agendaStartTime: dateToStringShort(agenda.agendaStartTime),
      //     agendaEndTime: dateToStringShort(agenda.agendaEndTime),
      //   };
      // });

      setAgendaInfo({
        agendaList: paginatedList,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS00');
    }
  }, [currentPage, status, isOfficial]);

  useEffect(() => {
    getAgendaList();
  }, [getAgendaList]);
  // if (agendaInfo.agendaList.length === 0) {
  //   return <div>데이터가 없습니다.</div>;
  // }
  const renderStatus = (status: string) => {
    switch (status) {
      case AgendaStatus.ON_GOING:
        return '진행 중';
      case AgendaStatus.CONFIRM:
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  const renderOfficial = (isOfficial: boolean) => {
    return isOfficial ? '공식' : '비공식';
  };

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>아젠다 관리</span>
        {/* <div className={styles.searchWrap}>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div> */}
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='agenda table'>
          <AdminAgendaTableHead tableName={'agenda'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {agendaInfo.agendaList.map((agenda: IAgenda) => (
              <TableRow key={agenda.agendaKey} className={styles.tableRow}>
                {agendaTableFormat['agenda'].columns.map(
                  (columnName: string, index: number) => {
                    return (
                      // <TableCell className={styles.tableBodyItem} key={index}>

                      /* <AdminContent
                          content={agenda[
                            columnName as keyof IAgenda
                          ]?.toString()}
                          maxLen={MAX_CONTENT_LENGTH}
                          detailTitle={agenda.title}
                          detailContent={agenda.contents}
                        /> */
                      <TableCell className={styles.tableBodyItem} key={index}>
                        {columnName === 'agendaStatus'
                          ? renderStatus(agenda.agendaStatus) // 상태 표시
                          : columnName === 'isOfficial'
                          ? renderOfficial(agenda.isOfficial) // 공식 여부 표시
                          : columnName !== 'etc'
                          ? agenda[columnName as keyof IAgenda] // 다른 열의 기본 값 표시
                          : agendaTableFormat['agenda'].etc?.value.map(
                              (buttonName: string, index: number) => (
                                <button
                                  key={buttonName}
                                  className={`${styles.button} ${buttonList[index]}`}
                                  onClick={() =>
                                    handleButtonAction(
                                      buttonName,
                                      agenda.agendaKey
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={agendaInfo.currentPage}
          totalPages={agendaInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
            getAgendaList();
          }}
        />
      </div>
    </div>
  );
}
