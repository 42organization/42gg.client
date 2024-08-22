import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
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
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { TeamStatus } from 'constants/agenda/agenda';
import { NoContent } from 'components/admin/agenda/utils';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

const tableTitle: { [key: string]: string } = {
  teamName: '팀 이름',
  teamLeaderIntraId: '팀장',
  teamMateCount: '팀원 수',
  teamIsPrivate: '공개 여부',
  teamAward: '상',
  teamAwardPriority: '등수',
  teamStatus: '상태',
  etc: '기타',
};

export interface ITeam {
  teamKey: string;
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  teamIsPrivate: boolean;
  teamAward: string;
  teamAwardPriority: number;
  teamStatus: string;
  coalitions: string[];
}

export interface ITeamTable {
  teamList: ITeam[];
  totalPage: number;
  currentPage: number;
}

export default function TeamTable() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const sendRequest = useFetchRequest().sendRequest;

  const [teamInfo, setTeamInfo] = useState<ITeamTable>({
    teamList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAgendaKey, setSelectedAgendaKey] = useState('');
  const agendaList = useFetchGet(`admin/list`).data || [];
  const setSnackBar = useSetRecoilState(toastState);

  const buttonList: string[] = [styles.coin, styles.penalty];

  const deleteTeam = async (teamInfo: TeamDetailProps) => {
    const updateTeam = {
      teamKey: teamInfo.teamKey,
      teamName: teamInfo.teamName,
      teamContent: 'content', // 이후 제거
      teamStatus: TeamStatus.CANCEL,
      teamIsPrivate: teamInfo.teamIsPrivate,
      teamLocation: 'SEOUL', // 이후 제거
      teamAward: teamInfo.teamAward,
      teamAwardPriority: teamInfo.teamAwardPriority,
      teamMates: [{ intraId: 'jihylim' }],
    };
    await sendRequest('PATCH', 'admin/team', updateTeam, {}, () => {
      getTeamList();
    });
  };

  const handleButtonAction = (
    buttonName: string,
    teamInfo: TeamDetailProps
  ) => {
    const teamKey = teamInfo.teamKey;
    switch (buttonName) {
      case '수정':
        router.push(`/admin/agenda/teamModify?team_key=${teamKey}`);
        break;
      case '취소':
        deleteTeam(teamInfo);
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

      if (response.data.content.length === 0) {
        setSnackBar({
          toastName: 'GET request',
          message: '팀이 없습니다.',
          severity: 'error',
          clicked: true,
        });
      }

      setTeamInfo({
        teamList: response.data.content,
        totalPage: Math.ceil(response.data.totalSize / itemsPerPage),
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('Error fetching team list:', e);
      setSnackBar({
        toastName: 'GET request',
        message: '팀 목록을 가져오는데 실패했습니다.',
        severity: 'error',
        clicked: true,
      });
    }
  }, [currentPage, selectedAgendaKey, agendaKey]);

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
                                        handleButtonAction(buttonName, team)
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
                <NoContent col={7} content={'팀이 없습니다.'} />
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
