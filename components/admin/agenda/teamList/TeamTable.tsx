import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AgendaStatus, TeamStatus } from 'constants/agenda/agenda';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

const mockTeamList = [
  {
    teamName: '팀 이름 1',
    teamStatus: TeamStatus.OPEN,
    teamScore: 100,
    teamIsPrivate: false,
    teamLeaderIntraId: 'leader1',
    teamMateCount: 5,
    teamKey: '1',
  },
  {
    teamName: '팀 이름 2',
    teamStatus: TeamStatus.CONFIRM,
    teamScore: 200,
    teamIsPrivate: true,
    teamLeaderIntraId: 'leader2',
    teamMateCount: 3,
    teamKey: '2',
  },
  {
    teamName: '팀 이름 3',
    teamStatus: TeamStatus.CANCEL,
    teamScore: 300,
    teamIsPrivate: false,
    teamLeaderIntraId: 'leader3',
    teamMateCount: 7,
    teamKey: '3',
  },
];
const tableTitle: { [key: string]: string } = {
  teamName: '팀 이름',
  teamStatus: '팀 상태',
  teamScore: '팀 등수',
  teamIsPrivate: '비공개 여부',
  teamLeaderIntraId: '팀장',
  teamMateCount: '팀원 수',
  etc: '기타',
};

export interface ITeam {
  teamName: string;
  teamStatus: string;
  teamScore: number;
  teamIsPrivate: boolean;
  teamLeaderIntraId: string;
  teamMateCount: number;
  teamKey: string;
}

export interface ITeamTable {
  teamList: ITeam[];
  totalPage: number;
  currentPage: number;
}

export interface Request {
  page: number;
  size: number;
}

export default function TeamTable({ status }: { status: string }) {
  const [teamInfo, setTeamInfo] = useState<ITeamTable>({
    teamList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, teamKey: string) => {
    switch (buttonName) {
      case '자세히':
        // setModal({ modalName: 'ADMIN-PROFILE', intraId });
        alert('자세히');
        break;
      case '팀 수정':
        alert('팀 수정');
        break;
      case '팀 삭제':
        alert('팀 삭제');
        break;
    }
  };

  const getTeamList = useCallback(async () => {
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
      const res = mockTeamList;

      const filteredTeamList = res.filter((team: ITeam) => {
        const teamStatus = status ? team.teamStatus === status : true;
        return teamStatus;
      });

      const totalPage = Math.ceil(filteredTeamList.length / itemsPerPage);
      const paginatedList = filteredTeamList.slice(
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

      setTeamInfo({
        teamList: paginatedList,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS00');
    }
  }, [currentPage, status]);

  useEffect(() => {
    getTeamList();
  }, [getTeamList]);

  const renderStatus = (status: string) => {
    switch (status) {
      case TeamStatus.OPEN:
        return '진행 중';
      case TeamStatus.CONFIRM:
        return '완료';
      case TeamStatus.CANCEL:
        return '취소';
      default:
        return '알 수 없음';
    }
  };

  const renderIsPrivate = (isPrivate: boolean) => {
    return isPrivate ? '비공개' : '공개';
  };

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>팀 관리</span>
        {/* <div className={styles.searchWrap}>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div> */}
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='agenda table'>
          <AdminAgendaTableHead tableName={'team'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {teamInfo.teamList.map((team: ITeam) => (
              <TableRow key={team.teamKey} className={styles.tableRow}>
                {agendaTableFormat['team'].columns.map(
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
                        {columnName === 'teamStatus'
                          ? renderStatus(team.teamStatus) // 상태 표시
                          : columnName === 'teamIsPrivate'
                          ? renderIsPrivate(team.teamIsPrivate) // 공개 여부 표시
                          : columnName !== 'etc'
                          ? team[columnName as keyof ITeam] // 다른 열의 기본 값 표시
                          : agendaTableFormat['team'].etc?.value.map(
                              (buttonName: string, index: number) => (
                                <button
                                  key={buttonName}
                                  className={`${styles.button} ${buttonList[index]}`}
                                  onClick={() =>
                                    handleButtonAction(buttonName, team.teamKey)
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
          curPage={teamInfo.currentPage}
          totalPages={teamInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
            getTeamList();
          }}
        />
      </div>
    </div>
  );
}
