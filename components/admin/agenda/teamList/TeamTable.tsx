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
import { TeamStatus } from 'constants/agenda/agenda';
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

const mockTeamList2 = [
  {
    teamName: '팀 이름 4',
    teamStatus: TeamStatus.OPEN,
    teamScore: 100,
    teamIsPrivate: false,
    teamLeaderIntraId: 'leader1',
    teamMateCount: 5,
    teamKey: '4',
  },
  {
    teamName: '팀 이름 5',
    teamStatus: TeamStatus.CONFIRM,
    teamScore: 200,
    teamIsPrivate: true,
    teamLeaderIntraId: 'leader2',
    teamMateCount: 3,
    teamKey: '5',
  },
  {
    teamName: '팀 이름 6',
    teamStatus: TeamStatus.CANCEL,
    teamScore: 300,
    teamIsPrivate: false,
    teamLeaderIntraId: 'leader3',
    teamMateCount: 7,
    teamKey: '6',
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

export default function TeamTable() {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [teamInfo, setTeamInfo] = useState<ITeamTable>({
    teamList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAgendaKey, setSelectedAgendaKey] = useState('');
  const agendaList = useFetchGet(`list`).data || [];

  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, teamKey: string) => {
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

  const getTeamList = useCallback(async () => {
    try {
      if (!selectedAgendaKey) {
        return;
      }

      const response = await instance.get(`/agenda/admin/team/list`, {
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

      setTeamInfo({
        teamList: response.data,
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
      getTeamList();
    }
  }, [selectedAgendaKey, currentPage, getTeamList]);

  const handleSelectChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    setSelectedAgendaKey(newValue);
    setCurrentPage(1); // 페이지 초기화
    router.push(`?agendaKey=${newValue}`);
  };

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
            <AdminAgendaTableHead tableName={'team'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {teamInfo.teamList.length > 0 ? (
                teamInfo.teamList.map((team: ITeam, index) => (
                  <TableRow
                    key={`${team.teamKey}-${index}`}
                    className={styles.tableRow}
                  >
                    {agendaTableFormat['team'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
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
                                        handleButtonAction(
                                          buttonName,
                                          team.teamKey
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                    팀이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={styles.noAgendaMessage}>아젠다를 선택해주세요.</div>
      )}
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={teamInfo.currentPage}
          totalPages={teamInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
