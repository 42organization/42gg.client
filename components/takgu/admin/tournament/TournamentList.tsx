import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  ITournament,
  ITournamentEditInfo,
  ITournamentTable,
} from 'types/takgu/admin/adminTournamentTypes';
import { instance, instanceInManage } from 'utils/axios';
import { dateToDateTimeLocalString, dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/takgu/recoil/modal';
import { toastState } from 'utils/takgu/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/takgu/admin/tournament/TournamentList.module.scss';

const tableTitle: { [key: string]: string } = {
  title: '토너먼트 이름',
  contents: '토너먼트 내용',
  startTime: '시작 시간',
  endTime: '종료 시간',
  type: '유형',
  edit: '수정하기',
};

interface TournamentListProps {
  scrollToEditor: () => void;
  tournamentEditInfo: ITournamentEditInfo;
  setTournamentEditInfo: Dispatch<SetStateAction<ITournamentEditInfo>>;
}

export default function TournamentList({
  scrollToEditor,
  tournamentEditInfo,
  setTournamentEditInfo,
}: TournamentListProps) {
  const tournamentDeleteResponse: { [key: string]: string } = {
    SUCCESS: '토너먼트가 성공적으로 삭제되었습니다.',
  };

  const setSnackbar = useSetRecoilState(toastState);
  const setModal = useSetRecoilState(modalState);
  const [tournamentInfo, setTournamentInfo] = useState<ITournamentTable>({
    tournamentList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchTournaments = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/tournaments?page=${currentPage}&size=20`
      );
      setTournamentInfo({
        tournamentList: res.data.tournaments,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const deleteHandler = async (tournamentId: number) => {
    try {
      await instanceInManage.delete(`/tournaments/${tournamentId}`);
      setSnackbar({
        toastName: `delete request`,
        severity: 'success',
        message: `🔥 ${tournamentDeleteResponse.SUCCESS} 🔥`,
        clicked: true,
      });
    } catch (e: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `🔥 ${e.response.data.message} 🔥`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>토너먼트 리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'tournament'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {tournamentInfo.tournamentList.length > 0 ? (
              tournamentInfo.tournamentList.map(
                (tournament: ITournament, index: number) => (
                  <TableRow
                    className={
                      tournamentEditInfo.tournamentId ===
                      tournament.tournamentId
                        ? styles.selectedTableRow
                        : styles.tableRow
                    }
                    key={index}
                  >
                    {tableFormat['tournament'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {columnName === 'startTime' ||
                            columnName === 'endTime' ? (
                              dateToStringShort(
                                new Date(
                                  tournament[
                                    columnName as keyof ITournament
                                  ] as Date
                                )
                              )
                            ) : columnName === 'edit' ? (
                              tournament.status === 'BEFORE' ||
                              tournament.status === 'READY' ? (
                                <div className={styles.listBtnContainer}>
                                  {tournament.status === 'BEFORE' && (
                                    <button
                                      className={styles.edit}
                                      onClick={() => {
                                        setTournamentEditInfo({
                                          tournamentId: tournament.tournamentId,
                                          title: tournament.title,
                                          contents: tournament.contents,
                                          type: tournament.type,
                                          startTime: dateToDateTimeLocalString(
                                            tournament.startTime
                                          ),
                                          endTime: dateToDateTimeLocalString(
                                            tournament.endTime
                                          ),
                                        });
                                        scrollToEditor();
                                      }}
                                    >
                                      내용 수정
                                    </button>
                                  )}
                                  <button
                                    className={styles.editParticipants}
                                    onClick={() => {
                                      setModal({
                                        modalName:
                                          'ADMIN-TOURNAMENT_PARTICIPANT_EDIT',
                                        tournamentId: tournament.tournamentId,
                                      });
                                    }}
                                  >
                                    인원 수정
                                  </button>
                                  <button
                                    className={styles.delete}
                                    onClick={() =>
                                      deleteHandler(tournament.tournamentId)
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              ) : (
                                <div className={styles.listBtnContainer}>
                                  <button
                                    className={styles.editBracket}
                                    onClick={() => {
                                      setModal({
                                        modalName:
                                          'ADMIN-TOURNAMENT_BRAKET_EDIT',
                                        tournament: tournament,
                                      });
                                    }}
                                  >
                                    대진표 수정
                                  </button>
                                </div>
                              )
                            ) : (
                              tournament[
                                columnName as keyof ITournament
                              ]?.toString()
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'기존 토너먼트가 없습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={tournamentInfo.currentPage}
          totalPages={tournamentInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
